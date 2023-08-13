pragma solidity ^0.5.0;

import "./LetterOfCredit.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LCManager {
    struct LCData {
        uint256 LCNo;
        address BuyerAcc;
        address SellerAcc;
        uint256 Amount;
        bytes2 Status;
        uint256 DOIssue;
        uint256 DOExpiry;
        address LCAddress;
    }

    LCData[] LCDoc;

    address owner;

    ERC20 public ERC20Interface;

    event CreateLCSuccessful(
        uint256 LCNum,
        address SAcc,
        address BAcc,
        uint256 Amt,
        bytes2 Stat,
        uint256 DOI,
        uint256 DOE,
        address LCAdd
    );

    event ModifyLCSuccessful(
        uint256 LCNum,
        address SAcc,
        address BAcc,
        uint256 Amt,
        bytes2 Stat
    );

  constructor(address _erc20Address) public payable {
    owner = msg.sender;
    ERC20Interface = ERC20(_erc20Address); // _erc20Address: USD Token Contract Address
    LCDoc.length = 1;
}


    modifier onlyOwner() {
        if (msg.sender != owner) revert();
        _;
    }

    function createLC(
        address BAcc,
        address SAcc,
        uint256 Amt,
        uint256 DOE
    ) public onlyOwner returns (uint256) {
        LetterOfCredit newLC = new LetterOfCredit(
            LCDoc.length,
            BAcc,
            SAcc,
            Amt,
            now,
            DOE,
            owner,
            address(ERC20Interface) 
        );
        
        ERC20Interface.transfer(address(newLC), Amt);

        LCDoc.push(
            LCData(LCDoc.length, BAcc, SAcc, Amt, "I", now, DOE, address(newLC))
        );
        emit CreateLCSuccessful(
            LCDoc[LCDoc.length - 1].LCNo,
            LCDoc[LCDoc.length - 1].SellerAcc,
            LCDoc[LCDoc.length - 1].BuyerAcc,
            LCDoc[LCDoc.length - 1].Amount,
            LCDoc[LCDoc.length - 1].Status,
            LCDoc[LCDoc.length - 1].DOIssue,
            LCDoc[LCDoc.length - 1].DOExpiry,
            LCDoc[LCDoc.length - 1].LCAddress
        );

        return LCDoc[LCDoc.length - 1].LCNo;
    }

    function lengthLC() public view returns (uint256) {
        return LCDoc.length;
    }

    function viewLC(uint256 viewLCNo)
        public
        view
        returns (
            address,
            address,
            uint256,
            bytes2,
            uint256,
            uint256,
            address
        )
    {
        if (
            msg.sender == owner ||
            msg.sender == LCDoc[viewLCNo].SellerAcc ||
            msg.sender == LCDoc[viewLCNo].BuyerAcc
        ) {
            return (
                LCDoc[viewLCNo].SellerAcc,
                LCDoc[viewLCNo].BuyerAcc,
                LCDoc[viewLCNo].Amount,
                LCDoc[viewLCNo].Status,
                LCDoc[viewLCNo].DOIssue,
                LCDoc[viewLCNo].DOExpiry,
                LCDoc[viewLCNo].LCAddress
            );
        }
    }

    function modifyLC(
        uint256 LCNum,
        uint256 SettleAmt,
        bytes2 Stat
    ) public {
        LCData memory Temp;
        Temp = LCDoc[LCNum];
        Temp.Status = Stat;
        Temp.Amount = SettleAmt;
        delete LCDoc[LCNum];
        LCDoc[LCNum] = Temp;

        emit ModifyLCSuccessful(
            LCDoc[LCNum].LCNo,
            LCDoc[LCNum].SellerAcc,
            LCDoc[LCNum].BuyerAcc,
            LCDoc[LCNum].Amount,
            LCDoc[LCNum].Status
        );
    }
}
