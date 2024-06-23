import { Router } from "express";
import { isAuthenticated } from "../utils/auth.middleware";
import getOAuthToken, { mpesaStkPush } from "../utils/mpesaAuth";

const walletRouter = Router();

walletRouter.post("/user/wallet", isAuthenticated, async (req: any, res: any) => {
    const {amount } = req.body

    getOAuthToken().then(access_token => {
        mpesaStkPush(amount, access_token).then(() => {
            req.user.wallet += amount

            try {
                req.user.save()
            } catch (error) {
                console.log(error)
                res.status(500).json({message: "Error updating user!"})
            }

            res.status(200).json({
                message: "Payment successful"
            })
        }).catch(error => {
            res.status(500).json({
                message: "Payment failed"
            })
        })
        })
    })

export default walletRouter