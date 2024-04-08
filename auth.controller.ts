import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('private-code')
    async requestVerificationCode(@Body('phoneNumber') phoneNumber: string, @Response() res) {
        const verificationCode = this.authService.generateVerificationCode();
        this.authService.saveVerificationCode(phoneNumber, verificationCode);
        return res.status(HttpStatus.OK).json({ verificationCode });
    }

    @Post('verify-code')
    async verifyVerificationCode(@Body('phoneNumber') phoneNumber: string, @Body('code') code: string, @Response() res) {
        const savedCode = this.authService.getVerificationCode(phoneNumber);
        if (savedCode && savedCode === code) {
            console.log("verification success");
            return res.status(HttpStatus.OK).json({ message: 'Verification successful' });
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid verification code' });
        }
    }
}
