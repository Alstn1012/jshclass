import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly verificationCodes: Map<string, string> = new Map();

    generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    saveVerificationCode(phoneNumber: string, code: string): void {
        this.verificationCodes.set(phoneNumber, code);
    }

    getVerificationCode(phoneNumber: string): string {
        return this.verificationCodes.get(phoneNumber);
    }
}
