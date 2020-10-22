import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import "@elastic/charts/dist/theme_only_light.css";
import {
  EuiAccordion,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
} from "@elastic/eui";
import "moment-timezone";
import TransactionList from "./TransactionList.jsx";
import StatsBox from "./StatsBox";
import StatCharts from "./StatCharts";

let today = new Date();
today.setDate(25);
let lastMonth = new Date();
if (lastMonth.getDate() < 25) lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setDate(25);

let twoMonthsAgo = new Date();
if (twoMonthsAgo.getDate() < 25)
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
else twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 1);
twoMonthsAgo.setDate(25);

function App() {
  return (
    <div>
      <EuiPageBody component="div">
        <EuiHeader>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType="visualizeApp">Kink</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeader>
      </EuiPageBody>
      <EuiPage>
        <EuiPageContent>
          <EuiPageContentBody>
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiPanel>
                  Current Month
                  <StatCharts
                    from={lastMonth.toLocaleDateString("sv")}
                    to={today.toLocaleDateString("sv")}
                  />
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiPanel>
                  Last Month
                  <StatCharts
                    from={twoMonthsAgo.toLocaleDateString("sv")}
                    to={lastMonth.toLocaleDateString("sv")}
                  />
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiTitle>
              <h2>Transactions</h2>
            </EuiTitle>
            <TransactionList />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPage>
    </div>
  );
}

export default App;
