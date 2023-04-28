import { Card } from "@mui/material"
import React from "react"

const CompanyHeader3 = () => {
    const widget = `
        <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL price today</span></a> by TradingView</div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js" async>
            {
            "symbol": "NASDAQ:AAPL",
            "width": "100%",
            "locale": "en",
            "colorTheme": "light",
            "isTransparent": true
            }
            </script>
        </div>
    `

    const cardRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (cardRef.current) {
            cardRef.current.innerHTML = widget
        }
    }, [])

    return (
        <Card ref={cardRef}></Card>
    )
}

export default CompanyHeader3