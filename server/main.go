package main

import (
	"log/slog"
	"os"
	"time"

	"github.com/gofiber/fiber/v2/middleware/compress"

	"github.com/gofiber/fiber/v2"

	"subscription-page-template/server/api"
	"subscription-page-template/server/config"
	"subscription-page-template/server/handlers"
)

func main() {
	err := config.LoadConfig()
	if err != nil {
		slog.Error("Failed to load config", "err", err)
		os.Exit(1)
	}

	app := fiber.New(fiber.Config{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  11 * time.Second,
	})

	app.Use(compress.New())
	app.Use(httpsAndProxyMiddleware())

	app.Static("/assets", "./dist/assets")
	app.Static("/locales", "./dist/locales")

	apiClient := api.NewClient(config.GetRemnawavePlainDomain())

	subscriptionHandler := handlers.NewSubscriptionHandler(apiClient)

	app.Get("/:shortId", subscriptionHandler.HandleSubscription)

	slog.Info("Starting server", "port", config.GetPort())
	if err := app.Listen(":" + config.GetPort()); err != nil {
		slog.Error("Failed to start server", "error", err)
		os.Exit(1)
	}
}

func httpsAndProxyMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		if config.GetHost() == "localhost" {
			return c.Next()
		}

		xForwardedFor := c.Get("X-Forwarded-For")
		xForwardedProto := c.Get("X-Forwarded-Proto")

		if xForwardedFor == "" || xForwardedProto != "https" {
			slog.Error("Reverse proxy and HTTPS are required.")
			return c.Status(fiber.StatusForbidden).SendString("Reverse proxy and HTTPS are required")
		}

		return c.Next()
	}
}
