// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function StockPriceChart({companyTicker}: {
    companyTicker: string
}) {
    const contariner = useRef<HTMLDivElement>();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "symbols": [
            [
                "${companyTicker}"
            ]
          ],
          "chartOnly": true,
          "width": "100%",
          "height": "350",
          "locale": "en",
          "colorTheme": "light",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineWidth": 2,
          "lineType": 0
        }`;
            contariner?.current?.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container" ref={contariner as any}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright"><a href={`https://www.tradingview.com/symbols/${companyTicker}/`} rel="noopener" target="_blank"><span className="blue-text">{companyTicker} stock price</span></a> by TradingView</div>
        </div>
    );
}

export default memo(StockPriceChart);
