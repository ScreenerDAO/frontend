import { Card } from "@mui/material";
import React from "react";

const CompanyHeader = () => {
    const [widget, setWidget] = React.useState("");

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
        script.async = true;
        script.text = `
      {
        "symbol": "NASDAQ:AAPL",
        "width": "100%",
        "locale": "en",
        "colorTheme": "light",
        "isTransparent": true
      }
    `;
        document.body.appendChild(script);

        const widgetHtml = `
      <div class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank">
            <span class="blue-text">AAPL price today</span>
          </a> by TradingView
        </div>
      </div>
    `;
        setWidget(widgetHtml);
    }, []);

    return (
        <Card>
            <div dangerouslySetInnerHTML={{ __html: widget }}></div>
        </Card>
    );
};

export default CompanyHeader;
