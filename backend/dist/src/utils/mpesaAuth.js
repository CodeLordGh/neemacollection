"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpesaStkPush = void 0;
const axios_1 = __importDefault(require("axios"));
const buffer_1 = require("buffer");
const moment_1 = __importDefault(require("moment"));
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const authUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
const getOAuthToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const auth = buffer_1.Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    try {
        const response = yield axios_1.default.get(authUrl, {
            headers: {
                'Authorization': `Basic ${auth}`
            },
            params: {
                grant_type: 'client_credentials'
            }
        });
        const { access_token } = response.data;
        return access_token;
    }
    catch (error) {
        console.error('Error getting OAuth token:', error.response ? error.response.data : error.message);
        throw error;
    }
});
const mpesaStkPush = (_amount, access_token) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = _amount.toString();
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    let timestamp = (0, moment_1.default)().format("YYYYMMDDHHmmss");
    const Password = buffer_1.Buffer.from("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString('base64');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    if (!access_token) {
        throw new Error('No access token found');
    }
    const options = {
        url,
        headers,
        method: 'POST',
        data: {
            BusinessShortCode: '174379',
            Password: Password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: '254708374149',
            PartyB: '174379',
            PhoneNumber: '254708374149',
            CallBackURL: 'https://m8cp7mn6-3000.uks1.devtunnels.ms/api/callback',
            AccountReference: 'Test',
            TransactionDesc: 'Test'
        }
    };
    try {
        const response = yield (0, axios_1.default)(options);
        // console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.mpesaStkPush = mpesaStkPush;
exports.default = getOAuthToken;
