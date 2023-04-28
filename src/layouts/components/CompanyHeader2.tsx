const CompanyHeader2 = ({companyTicker}: {
    companyTicker: string
}) => {
    return (
        <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright"><a href={`https://www.tradingview.com/symbols/${companyTicker}/`} rel="noopener" target="_blank"><span className="blue-text">{companyTicker} price today</span></a> by TradingView</div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js" async>
                {`
                    {
                        "symbol": "NASDAQ:AAPL",
                        "width": "100%",
                        "locale": "en",
                        "colorTheme": "light",
                        "isTransparent": true
                    }`
                }
            </script>
        </div>
    )
}

export default CompanyHeader2