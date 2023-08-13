pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./LCManager.sol";

contract LetterOfCredit {
    struct LoC {
        uint256 LCNo;
        address BuyerAcc;
        address SellerAcc;
        uint256 Amount;
        uint256 IniAmount;
        bytes2 Status;
        uint256 DOIssue;
        uint256 DOExpiry;
        bytes32 DocHash;
    }

    LoC LCnew;

    LCManager LCM;
    ERC20 public ERC20Interface;

    address bank;

    constructor(
        uint256 LCNum,
        address BAcc,
        address SAcc,
        uint256 Amt,
        uint256 DOI,
        uint256 DOE,
        address bankadd,
        address erc20Address // USD ADDRESS
    ) public {
        bank = bankadd;
        LCnew.LCNo = LCNum;
        LCnew.BuyerAcc = BAcc;
        LCnew.SellerAcc = SAcc;
        LCnew.Amount = Amt;
        LCnew.IniAmount = Amt;
        LCnew.Status = "I"; // I - Issued, S - Settled, P - Partially Settled
        LCnew.DOIssue = DOI;
        LCnew.DOExpiry = DOE;
        LCnew.DocHash = 0x0;
        LCM = LCManager(msg.sender);
        ERC20Interface = ERC20(erc20Address);
    }

    modifier onlyAuth() {
        if (
            msg.sender != bank &&
            msg.sender != LCnew.BuyerAcc &&
            msg.sender != LCnew.SellerAcc
        ) revert();
        _;
    }

    modifier onlySeller() {
        if (msg.sender != LCnew.SellerAcc) revert();
        _;
    }

    event SettleLCSuccessful(
        uint256 LCNum,
        address SAcc,
        uint256 Amt,
        uint256 IAmt,
        bytes2 Stat,
        bytes32 DocH
    );

    function viewLCdetails()
        public
        view
        onlyAuth
        returns (
            uint256,
            address,
            address,
            uint256,
            uint256,
            bytes2,
            uint256,
            uint256,
            bytes32
        )
    {
        return (
            LCnew.LCNo,
            LCnew.BuyerAcc,
            LCnew.SellerAcc,
            LCnew.Amount,
            LCnew.IniAmount,
            LCnew.Status,
            LCnew.DOIssue,
            LCnew.DOExpiry,
            LCnew.DocHash
        );
    }

    function settleLC(uint256 SettleAmt, bytes32 DocH) public onlySeller {
        require(
            LCnew.DOExpiry >= now && now >= LCnew.DOIssue,
            "LC Expired or Invalid Date ofIssue"
        );
        require(
            SettleAmt > 0 && SettleAmt <= LCnew.Amount,
            "Invalid Settlement Amount"
        );

        if (SettleAmt == LCnew.Amount) {
            LCnew.Amount = 0;
            LCnew.Status = "S";
            LCnew.DocHash = DocH;
            ERC20Interface.transfer(msg.sender, SettleAmt);

            LCM.modifyLC(LCnew.LCNo, 0, "S");

            emit SettleLCSuccessful(
                LCnew.LCNo,
                LCnew.SellerAcc,
                LCnew.Amount,
                LCnew.IniAmount,
                LCnew.Status,
                LCnew.DocHash
            );
        } else {
            LCnew.Amount = LCnew.Amount - SettleAmt;
            LCnew.Status = "P";
            LCnew.DocHash = DocH;

            ERC20Interface.transfer(msg.sender, SettleAmt);

            LCM.modifyLC(LCnew.LCNo, LCnew.Amount, "P");

            emit SettleLCSuccessful(
                LCnew.LCNo,
                LCnew.SellerAcc,
                LCnew.Amount,
                LCnew.IniAmount,
                LCnew.Status,
                LCnew.DocHash
            );
        }
    }
}
