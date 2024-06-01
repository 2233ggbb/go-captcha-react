/**
 * @Author Awen
 * @Date 2024/05/25
 * @Email wengaolng@gmail.com
 **/

export interface CaptchaConfig {
  width?: number;
  height?: number;
  size?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
}

export const defaultConfig = ():CaptchaConfig => ({
  width: 300,
  height: 240,
  size: 240,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
})
