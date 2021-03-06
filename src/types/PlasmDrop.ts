import BigNumber from 'bignumber.js';
import { LockEvent } from './LockdropModels';

export class PlmDrop {
    receiver: string;
    basePlm: BigNumber;
    introducerAndBonuses: [string, BigNumber][];
    affiliationRefsBonuses: [string, BigNumber][];
    locks: LockEvent[];

    constructor(
        receiver: string,
        basePlm: BigNumber,
        introducerAndBonuses: [string, BigNumber][],
        affiliationRefsBonuses: [string, BigNumber][],
        locks: LockEvent[],
    ) {
        this.receiver = receiver;
        this.basePlm = basePlm;
        this.introducerAndBonuses = introducerAndBonuses;
        this.affiliationRefsBonuses = affiliationRefsBonuses;
        this.locks = locks;
    }

    getTotal(): string {
        let totalIntroBonuses = new BigNumber(0);

        for (let i = 0; i < this.introducerAndBonuses.length; i++) {
            totalIntroBonuses = totalIntroBonuses.plus(this.introducerAndBonuses[i][1]);
        }

        const affBonus = this.calculateAffBonus();

        return this.basePlm
            .plus(totalIntroBonuses)
            .plus(affBonus)
            .toFixed();
    }

    getTotalPlm(): string {
        return new BigNumber(this.getTotal()).toFixed();
    }

    getAffBonus(): string {
        return new BigNumber(this.calculateAffBonus()).toFormat(2);
    }

    getIntroBonus(): string {
        return new BigNumber(this.calculateIntroBonus()).toFormat(2);
    }

    // calculate the number of PLM you get for being affiliated
    calculateAffBonus(): BigNumber {
        return this.affiliationRefsBonuses.reduce(
            (sum: BigNumber, bonus: [string, BigNumber]): BigNumber => sum.plus(bonus[1]),
            new BigNumber(0),
        );
    }

    // the number of PLM you get for referencing an affiliate
    calculateIntroBonus(): BigNumber {
        return this.introducerAndBonuses.reduce(
            (sum: BigNumber, bonus: [string, BigNumber]): BigNumber => sum.plus(bonus[1]),
            new BigNumber(0),
        );
    }
}
