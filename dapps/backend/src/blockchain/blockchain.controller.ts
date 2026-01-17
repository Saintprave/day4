import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get()
  getInfo() {
    return {
      message: 'Blockchain API',
      endpoints: {
        getValue: 'GET /blockchain/value',
        getEvents: 'POST /blockchain/events',
      },
    };
  }

  @Get('value')
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  @Post('events')
  async getEvents(@Body() body: { fromBlock: string; toBlock?: string }) {
    const fromBlock = BigInt(body.fromBlock);
    const toBlock = body.toBlock === 'latest' || !body.toBlock 
      ? 'latest' 
      : BigInt(body.toBlock);

    return this.blockchainService.getValueUpdatedEvents(fromBlock, toBlock);
  }
}
