import * as dns from 'node:dns';
import { Injectable } from '@nestjs/common';
import { DomainCheckAvailabilityResult } from './types';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class DomainService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async suggestDomains(description: string) {
    const domainNames =
      await this.openaiService.generateDomainNames(description);
    return await this.checkDomainsAvailability(domainNames);
  }

  public async suggestFakeDomains() {
    const domainNames = await this.getFakeDomainNames();
    return await this.checkDomainsAvailability(domainNames);
  }

  private getFakeDomainNames(): Promise<string[]> {
    return new Promise((resolve, _) => {
      resolve(['google', 'facebook', 'orbitlaptops', 'sharktech']);
    });
  }

  private isDomainAvailable(domain: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      dns.resolve(domain.toLowerCase(), (error) => {
        if (error && error.code === 'ENOTFOUND') resolve(true);
        else resolve(false);
      });
    });
  }

  private async checkDomainsAvailability(
    domainNames: string[],
  ): Promise<DomainCheckAvailabilityResult[]> {
    let result: DomainCheckAvailabilityResult[] = [];
    const suffixes = [
      'com',
      'net',
      'ai',
      'org',
      'co',
      'us',
      'gov',
      'edu',
      'info',
      'xyz',
      'ly',
      'site',
      'me',
    ];
    for (const suffix of suffixes) {
      const suffixRes: DomainCheckAvailabilityResult[] = await Promise.all(
        domainNames.map(async (domainName) => {
          const domain = `${domainName}.${suffix}`;
          return {
            domain,
            domainName,
            suffix,
            isAvailable: await this.isDomainAvailable(domain),
          };
        }),
      );
      result = result.concat(suffixRes);
    }
    return result;
  }
}
