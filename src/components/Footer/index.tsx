import {GithubOutlined, WechatOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {Tooltip} from "antd";
import wechat from '@/../public/assets/WeChat.jpg';

const Footer: React.FC = () => {
    const defaultMessage = '落樱工作室出品';
    const currentYear = new Date().getFullYear();
    return (
        <DefaultFooter
            style={{
                background: 'none',
            }}
            // @ts-ignore
            copyright={<>
                {`${currentYear} ${defaultMessage}`} |{' '}
                <a target={'_blank'} href={"https://beian.miit.gov.cn/"} rel="noreferrer"> 渝ICP备2024021408号-1</a>
                {/*{" | "}
                <a target={'_blank'}
                   href={'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41172702000163'}
                   rel="noreferrer">
                    <img src=""
                         alt={'渝公网安备 41172702000163号'}/> 渝公网安备 号
                </a>*/}

            </>}
            links={[
                {
                    key: 'github',
                    title: (
                        <Tooltip title="查看本站技术及源码，欢迎 star">
                            <GithubOutlined/> 支持项目
                        </Tooltip>
                    ),
                    href: 'https://github.com/1ranxu/luoapi-backend',
                    blankTarget: true,
                },
                {
                    key: 'contact',
                    title: (
                        <Tooltip title={<img src={wechat} alt="微信 code_nav" width="120"/>}>
                            <WechatOutlined/> 联系作者
                        </Tooltip>
                    ),
                    href: 'https://img.luoying.icu/typory/WeChat.jpg',
                    blankTarget: true,
                },
            ]}
        />
    );
};
export default Footer;
