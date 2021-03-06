import React, { ReactElement } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import { OptionData } from '../types/LockdropModels';

// react function component for making dropdown with the given items
export const DropdownOption: React.FC<OptionData> = ({ dataSets, onChoose }: OptionData): ReactElement => {
    const items = dataSets.map(x => {
        return (
            <IonSelectOption className="dropdown-item" key={dataSets.indexOf(x)} value={x.value}>
                {x.label}
            </IonSelectOption>
        );
    });

    return (
        <IonSelect interface="popover" onIonChange={e => onChoose(e.detail.value)}>
            {items}
        </IonSelect>
    );
};
