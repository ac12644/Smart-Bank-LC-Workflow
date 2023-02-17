import React, { useState } from "react";
import Web3 from "web3";
import Nav from "./components/Nav";
import Description from "./components/Description";
import Container from "./components/Container";
import LCManager from "./contracts/LCManager";
import LCabi from "./contracts/LCabi";

const App = () => {
  const [role, setRole] = useState(null);
  const [option, setOption] = useState(null);
  const [LCNew, setLCNew] = useState([]);
  const [LC, setLC] = useState([]);
  const [fields, setFields] = useState({
    BuyerAccount: null,
    SellerAccount: null,
    Amount: null,
    DOExpiry: null,
    DocHash: null,
    LCNo: null,
  });

  const LCManagerInstance = new LCManager(
    LCManager.address,
    new Web3(Web3.givenProvider)
  );

  const viewLC = async () => {
    const response = await LCManagerInstance.viewLC();
    if (response) {
      setLC(response);
    }
  };

  const createLC = async () => {
    const { BuyerAccount, SellerAccount, Amount, DOExpiry } = fields;
    const DOE = new Date(
      DOExpiry.slice(0, 4),
      DOExpiry.slice(4, 6) - 1,
      DOExpiry.slice(6, 8),
      23,
      59,
      59,
      0
    );
    const app = this;
    const response = await LCManagerInstance.createLC(
      BuyerAccount,
      SellerAccount,
      Amount,
      Math.floor(DOE.getTime() / 1000.0)
    );
    if (response) {
      console.log("LC No.");
      console.log(response);
      resetApp();
    }
  };

  const settleLC = async () => {
    const { LCNo, Amount, DocHash } = fields;
    const response = await LCManagerInstance.viewLC(LCNo);
    if (response) {
      const LCAddress = response[6];
      const LCAbiInstance = new LCabi(LCAddress, new Web3(Web3.givenProvider));
      const result = await LCAbiInstance.settleLC(Amount, DocHash);
      if (result) {
        console.log(result);
        resetApp();
      }
    }
  };

  const viewSingleLC = async (LCAdd) => {
    const LCAbiInstance = new LCabi(LCAdd, new Web3(Web3.givenProvider));
    const response = await LCAbiInstance.viewLCdetails();
    if (response) {
      const LCNo = response[0];
      const BuyerAcc = response[1];
      const SellerAcc = response[2];
      const Amount = response[3];
      const IniAmount = response[4];
      const Status = response[5];
      const DOI = response[6];
      const DOE = response[7];
      const DocHash = response[8];

      const LC = [];
      LC.push({
        LCNo,
        BuyerAcc,
        SellerAcc,
        Amount,
        IniAmount,
        Status,
        DOI,
        DOE,
        DocHash,
      });
      setLC(LC);
    }
  };

  const onInputChangeUpdateField = (name, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const closeTab = () => {
    setRole(null);
    setOption(null);
    setFields({});
  };

  const closeViewTab = () => {
    setOption("View");
  };

  const resetApp = () => {
    setRole(null);
    setOption(null);
    setFields({});
  };

  const BankSessionView = () => {
    setRole("Bank");
    setOption("View");
    viewLC();
  };

  const SellerSessionView = () => {
    setRole("Seller");
    setOption("View");
    viewLC();
  };

  const SellerSessionVSettle = (LCNo) => {
    setRole("Seller");
    setOption("Settle");
    fields.LCNo = LCNo;
  };

  const SellerSessionSettle = () => {
    setRole("Seller");
    setOption("Settle");
  };

  const BuyerSessionView = () => {
    setRole("Buyer");
    setOption("View");
    viewLC();
  };

  const BankSessionCreate = () => {
    setRole("Bank");
    setOption("Create");
  };

  return (
    <div>
      <Nav appName="Bank" />
      <Description />
      <Container
        role={role}
        option={option}
        account={account}
        LCNew={LCNew}
        LC={LC}
        viewLC={viewLC}
        createLC={createLC}
        settleLC={settleLC}
        viewSingleLC={viewSingleLC}
        BuyerSessionView={BuyerSessionView}
        BankSessionCreate={BankSessionCreate}
        BankSessionView={BankSessionView}
        SellerSessionView={SellerSessionView}
        SellerSessionSettle={SellerSessionSettle}
        SellerSessionVSettle={SellerSessionVSettle}
        onInputChangeUpdateField={onInputChangeUpdateField}
        fields={fields}
        closeTab={closeTab}
        closeViewTab={closeViewTab}
      />
    </div>
  );
};
export default App;
