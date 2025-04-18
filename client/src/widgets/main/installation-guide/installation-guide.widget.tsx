import {
    IconBrandAndroid,
    IconBrandApple,
    IconCheck,
    IconCloudDownload,
    IconDeviceDesktop,
    IconDownload,
    IconExternalLink
} from '@tabler/icons-react'
import { Button, Group, Tabs, Text, ThemeIcon, Timeline } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { useSubscriptionInfoStoreInfo } from '@entities/subscription-info-store'

export const InstallationGuideWidget = () => {
    const { t } = useTranslation()
    const { subscription } = useSubscriptionInfoStoreInfo()

    const [defaultTab] = useState(() => {
        const userAgent = window?.navigator?.userAgent?.toLowerCase() || ''
        if (userAgent.includes('android')) return 'android'
        if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios'
        return 'desktop'
    })

    if (!subscription) return null

    const { subscriptionUrl } = subscription

    const openclash = () => {
        window.open(`clash://install-config?url=${subscriptionUrl}`, '_blank')
    };

    const opensingbox = () => {
        window.open(`sing-box://import-remote-profile?url=${subscriptionUrl}`, '_blank');
    };
    
    return (
        <Tabs defaultValue={defaultTab}>
            <Group mb="md">
                <Text fw={700} size="xl">
                    {t('installation-guide.widget.instrukciya')}
                </Text>
                <Tabs.List>
                    <Tabs.Tab leftSection={<IconBrandAndroid />} value="android">
                        Android
                    </Tabs.Tab>
                    <Tabs.Tab leftSection={<IconBrandApple />} value="ios">
                        iOS
                    </Tabs.Tab>
                    <Tabs.Tab leftSection={<IconDeviceDesktop />} value="desktop">
                        {t('installation-guide.widget.pk')}
                    </Tabs.Tab>
                </Tabs.List>
            </Group>

            <Tabs.Panel value="android">
                <Timeline active={1} bulletSize={32} color="teal" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.install-clashmeta')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.download-clashmeta')}
                        </Text>
                        <Group>
                            <Button
                                component="a"
                                href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.7/cmfa-2.11.7-meta-universal-release.apk"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                {t('installation-guide.widget.download-github')}
                            </Button>
                            <Button
                                component="a"
                                href="https://f-droid.org/packages/com.github.metacubex.clash.meta/"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                {t('installation-guide.widget.open-in-fdroid')}
                            </Button>
                        </Group>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.add-subscription-description-clashmeta')}
                        </Text>
                        <Button onClick={openclash} variant="filled">
                            {t('installation-guide.widget.add-subscription-button')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm">
                            {t('installation-guide.widget.connect-and-use-description-clashmeta')}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Panel>

            <Tabs.Panel value="ios">
                <Timeline active={1} bulletSize={32} color="teal" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.install-singbox')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.install-app-store-description')}
                        </Text>
                        <Button
                            component="a"
                            href="https://apps.apple.com/app/sing-box-vt/id6673731168"
                            leftSection={<IconExternalLink size={16} />}
                            target="_blank"
                            variant="light"
                        >
                            {t('installation-guide.widget.open-app-store')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.add-ios-subscription-description')}
                        </Text>
                        <Button onClick={opensingbox} variant="filled">
                            {t('installation-guide.widget.add-subscription-button')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm">
                            {t('installation-guide.widget.connect-and-use-description-singbox')}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Panel>

            <Tabs.Panel value="desktop">
                <Timeline active={1} bulletSize={32} color="teal" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.install-clash-verge-rev')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.install-clash-verge-rev-description')}
                        </Text>
                        <Group>
                            <Button
                                component="a"
                                href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64-setup.exe"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                Windows
                            </Button>
                            <Button
                                component="a"
                                href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_aarch64.dmg"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                macOS Apple Silicon
                            </Button>
                            <Button
                                component="a"
                                href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64.dmg"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                macOS Intel x64
                            </Button>
                            <Button
                                component="a"
                                href="https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_amd64.deb"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                Linux
                            </Button>
                        </Group>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.add-subscription-pc-description')}
                        </Text>
                        <Button onClick={openclash} variant="filled">
                            {t('installation-guide.widget.add-subscription-button')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm">
                            {t('installation-guide.widget.select-server-clash-verge-rev')}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Panel>
        </Tabs>
    )
}
