import React, { Component } from 'react';
import UIShell from './content/UIShell/UIShell';
import './App.scss';
import { StockItemService } from "./services/stock-item.service";
import { AuditService } from "./services/audit.service";

class App extends Component {
  constructor(props) {
    super(props);

    this.stockService = props.stockService || new StockItemService();
    this.auditService = props.auditService || new AuditService();
  }

  render() {
    return (
      <div className="app">
        <UIShell stockService={this.stockService} auditService={this.auditService} />
      </div>
    );
  }
}

export default App;