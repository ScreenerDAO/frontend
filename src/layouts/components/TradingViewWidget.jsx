// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
	const onLoadScriptRef = useRef();

	useEffect(
		() => {
			onLoadScriptRef.current = createWidget;

			if (!tvScriptLoadingPromise) {
				tvScriptLoadingPromise = new Promise((resolve) => {
					const script = document.createElement('script');
					script.id = 'tradingview-widget-loading-script';
					script.src = 'https://s3.tradingview.com/tv.js';
					script.type = 'text/javascript';
					script.onload = resolve;

					document.head.appendChild(script);
				});
			}

			tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

			return () => onLoadScriptRef.current = null;

			function createWidget() {
				if (document.getElementById('tradingview_44463') && 'TradingView' in window) {
					new window.TradingView.widget({
						autosize: true,
						symbol: "NASDAQ:AAPL",
						interval: "D",
						timezone: "Etc/UTC",
						theme: "light",
						style: "2",
						locale: "en",
						toolbar_bg: "#f1f3f6",
						enable_publishing: false,
						allow_symbol_change: true,
						container_id: "tradingview_44463"
					});
				}
			}
		},
		[]
	);

	return (
		<div className='tradingview-widget-container'>
			<div id='tradingview_44463' />
			<div className="tradingview-widget-copyright">
				<a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span className="blue-text">AAPL stock chart</span></a> by TradingView
			</div>
		</div>
	);
}
