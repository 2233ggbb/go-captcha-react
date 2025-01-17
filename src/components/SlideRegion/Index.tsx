/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

import React, {FC, useEffect, useRef} from 'react';
import classnames from "classnames";
import cstyles from './index.module.less'
import styles from './../../gocaptcha.module.less'
import CloseIcon from './../../assets/icons/CloseIcon'
import RefreshIcon from './../../assets/icons/RefreshIcon'
import LoadingIcon from './../../assets/icons/LoadingIcon'
import {SlideRegionConfig, defaultConfig} from "./meta/config";
import {useHandler} from "./hooks/useHandler";
import {SlideRegionData} from "./meta/data";
import {SlideRegionEvent} from "./meta/event";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  data: SlideRegionData,
  config?: SlideRegionConfig;
  events?: SlideRegionEvent,
}

const Index:FC<Props> = (props: Props) => {
  const conf = {
    ...defaultConfig(),
    ...(props.config || {})
  }

  const containerRef = useRef<any>(null)
  const tileRef = useRef<any>(null)

  const data = props.data || {}
  const handler = useHandler(data, props.events || {}, containerRef, tileRef);

  const hPadding = conf.horizontalPadding || 0
  const vPadding = conf.verticalPadding || 0
  const width = (conf.width || 0) + ( hPadding * 2) + (conf.showTheme ? 2 : 0)

  useEffect(() => {
    tileRef.current.addEventListener('dragstart', (event: any) => event.preventDefault());
  }, [tileRef]);

  return <div className={classnames(styles.wrapper, cstyles.wrapper, conf.showTheme ? styles.theme : '')}
              style={{
                width:  width+ "px",
                paddingLeft: hPadding + "px",
                paddingRight: hPadding + "px",
                paddingTop: vPadding + "px",
                paddingBottom: vPadding + "px",
              }}>
    <div className={classnames(styles.header, cstyles.header)}>
      <span>{conf.title}</span>
    </div>
    <div className={styles.body} ref={containerRef} style={{width: conf.width + "px", height: conf.height + "px"}}>
      <div className={styles.loading}>
        <LoadingIcon />
      </div>
      <img className={classnames(styles.picture, data.image == '' ? styles.hide : '')} src={data.image} style={{width: conf.width + "px", height: conf.height + "px"}} alt="..." />
      <div className={cstyles.tile} ref={tileRef} style={{width: (data.thumbWidth || 0) + 'px', height: (data.thumbHeight || 0) + 'px', top: handler.thumbPoint.y + "px", left: handler.thumbPoint.x + "px"}} onMouseDown={handler.dragEvent} onTouchStart={handler.dragEvent} >
        <img className={data.thumb == '' ? styles.hide : ''} src={data.thumb} alt="..."/>
      </div>
    </div>
    <div className={styles.footer}>
      <div className={styles.iconBlock}>
        <CloseIcon width={20} height={20} onClick={handler.closeEvent}/>
        <RefreshIcon width={20} height={20} onClick={handler.refreshEvent}/>
      </div>
    </div>
  </div>
}

export default React.memo(Index)