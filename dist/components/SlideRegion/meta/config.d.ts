/**
 * @Author Awen
 * @Date 2024/05/25
 * @Email wengaolng@gmail.com
 **/
export interface CaptchaConfig {
    width?: number;
    height?: number;
    verticalPadding?: number;
    horizontalPadding?: number;
    showTheme?: boolean;
}
export declare const defaultConfig: () => CaptchaConfig;
