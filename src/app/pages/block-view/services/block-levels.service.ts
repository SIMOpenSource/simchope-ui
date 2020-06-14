import {Injectable} from '@angular/core';

@Injectable()
export class BlockLevelsService {
  blockToLevelMap: Map<string, number> = new Map<string, number>();

  constructor() {
    this.blockToLevelMap.set('A', 4);
    this.blockToLevelMap.set('B', 5);
    this.blockToLevelMap.set('C', 1);
  }

  getLevelsByBlock = (block: string): number => this.blockToLevelMap.get(block);
}
