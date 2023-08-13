import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import Description from "./components/Description";
import Container from "./components/Container";
import LCManager from "./contracts/LCManager";
import LCabi from "./contracts/LCabi";

function dateToTimestamp(dateInput) {
  const [year, month, day] = dateInput
    .split("-")
    .map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day);
  return Math.floor(date.getTime() / 1000);
}

const App = () => {
  const LCManagerRef = LCManager;
  const LCabiRef = LCabi;
  const appName = "Bank";

  const [state, setState] = useState({
    role: null,
    option: null,
    LCNew: [],
    LC: [],
    fields: {
      BuyerAccount: null,
      SellerAccount: null,
      Amount: null,
      DOExpiry: null,
      DocHash: null,
      LCNo: null,
    },
    account: null,
  });

  const web3Ref = useRef(null);

  const initializeWeb3 = () => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      web3Ref.current = new Web3(ethereum);
      ethereum
        .enable()
        .then((accounts) => {
          setAccount(accounts[0]);
          web3Ref.current.eth.defaultAccount = accounts[0];
        })
        .catch((error) => {
          console.error("Failed to enable ethereum", error);
        });
    }
  };

  const setAccount = (account) => {
    setState((prevState) => ({ ...prevState, account }));
  };

  useEffect(initializeWeb3, []);

  const BuyerSessionView = () => {
    setState((prevState) => ({
      ...prevState,
      role: "Buyer",
      option: "View",
    }));
    viewLC();
  };

  const BankSessionCreate = () => {
    setState((prevState) => ({
      ...prevState,
      role: "Bank",
      option: "Create",
    }));
  };

  const BankSessionView = () => {
    setState((prevState) => ({
      ...prevState,
      role: "Bank",
      option: "View",
    }));
    viewLC();
  };

  const SellerSessionView = () => {
    setState((prevState) => ({
      ...prevState,
      role: "Seller",
      option: "View",
    }));
    viewLC();
  };

  const SellerSessionVSettle = (LCNo) => {
    setState((prevState) => ({
      ...prevState,
      role: "Seller",
      option: "Settle",
      fields: {
        ...prevState.fields,
        LCNo: LCNo,
      },
    }));
  };

  const SellerSessionSettle = () => {
    setState((prevState) => ({
      ...prevState,
      role: "Seller",
      option: "Settle",
    }));
  };

  const onInputChangeUpdateField = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [name]: value,
      },
    }));
  };

  const createLC = () => {
    const { fields } = state;

    var contract = new web3Ref.current.eth.Contract(
      LCManagerRef.abi,
      LCManagerRef.address
    );

    let dateExpiry = fields.DOExpiry;
    const DOE = dateToTimestamp(dateExpiry);

    contract.methods
      .createLC(fields.BuyerAccount, fields.SellerAccount, fields.Amount, DOE)
      .send({ from: web3Ref.current.eth.defaultAccount })
      .then(function (response) {
        if (response) {
          toast.success("LC successfully created!");
          resetApp();
        } else {
          toast.error("Error creating LC. Please try again.");
        }
      })
      .catch(function (error) {
        console.error("Error creating LC:", error);
        toast.error("Error creating LC. Please try again.");
      });
  };

  const settleLC = () => {
    const { fields } = state;

    const contractMaster = new web3Ref.current.eth.Contract(
      LCManagerRef.abi,
      LCManagerRef.address
    );

    contractMaster.methods
      .viewLC(fields.LCNo)
      .call()
      .then((response) => {
        if (response) {
          const LCAddress = response[6];
          const contractLC = new web3Ref.current.eth.Contract(
            LCabiRef.abi,
            LCAddress
          );

          return contractLC.methods
            .settleLC(fields.Amount, fields.DocHash)
            .send({ from: web3Ref.current.eth.defaultAccount });
        } else {
          throw new Error("LC not found");
        }
      })
      .then((response) => {
        if (response) {
          toast.success("LC successfully settled!");
          resetApp();
        } else {
          toast.error("Error settling LC. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(
          "Error settling LC. Please check the details and try again."
        );
      });
  };

  const viewSingleLC = (LCAdd) => {
    let app = state;
    setState((prevState) => ({ ...prevState, LC: [] }));

    var contract = new web3Ref.current.eth.Contract(LCabiRef.abi, LCAdd);
    contract.methods
      .viewLCdetails()
      .call()
      .then(function (response) {
        if (response) {
          let LCNo = response[0];
          let BuyerAcc = response[1];
          let SellerAcc = response[2];
          let Amount = response[3];
          let IniAmount = response[4];
          let Status = web3Ref.current.utils.hexToAscii(response[5]);
          let DOI = response[6];
          let DOE = response[7];
          let DocHash = response[8];

          let LC = app.LC;
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

          setState((prevState) => ({
            ...prevState,
            LC,
            option: "ViewSingleLC",
          }));
        }
      });
  };

  const viewLC = () => {
    let app = state;
    var lastLC;

    var contract = new web3Ref.current.eth.Contract(
      LCManagerRef.abi,
      LCManagerRef.address
    );
    contract.methods
      .lengthLC()
      .call()
      .then(function (response) {
        if (response) {
          lastLC = response;

          if (lastLC > 1) {
            setState((prevState) => ({ ...prevState, LCNew: [] }));
            for (let i = 1; i < lastLC; i++) {
              contract.methods
                .viewLC(i)
                .call()
                .then(function (response) {
                  if (response) {
                    let LCNo = i;
                    let SAcc = response[0];
                    let BAcc = response[1];
                    let Amount = response[2];
                    let Status = web3Ref.current.utils.hexToAscii(response[3]);
                    let DOI = response[4];
                    let DOE = response[5];
                    let LCAdd = response[6];

                    let LCNew = app.LCNew;
                    LCNew.push({
                      LCNo,
                      BAcc,
                      SAcc,
                      Amount,
                      Status,
                      DOI,
                      DOE,
                      LCAdd,
                    });

                    setState((prevState) => ({
                      ...prevState,
                      LCNew,
                    }));
                  }
                });
            }
          }
        }
      });
  };

  const closeTab = () => {
    setState((prevState) => ({
      ...prevState,
      role: null,
      option: null,
      fields: {},
    }));
  };

  const closeViewTab = () => {
    setState((prevState) => ({
      ...prevState,
      option: "View",
    }));
  };

  const resetApp = () => {
    setState({
      role: null,
      option: null,
      fields: {
        BuyerAccount: null,
        SellerAccount: null,
        Amount: null,
        DOExpiry: null,
        DocHash: null,
        LCNum: null,
      },
    });
  };

  return (
    <>
      <Nav appName={appName} />
      <Description />
      <Container
        role={state.role}
        option={state.option}
        account={state.account}
        LCNew={state.LCNew}
        LC={state.LC}
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
        fields={state.fields}
        closeTab={closeTab}
        closeViewTab={closeViewTab}
      />
      <ToastContainer />
    </>
  );
};

export default App;
