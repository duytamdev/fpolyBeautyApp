import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const AccountLoader = () => (
    <ContentLoader viewBox="0 0 360 725" >
            <Rect x="64" y="71" rx="0" ry="0" width="37" height="0" />
            <Rect x="4" y="192" rx="4" ry="4" width="170" height="181" />
            <Rect x="176" y="194" rx="4" ry="4" width="170" height="88" />
            <Rect x="4" y="377" rx="4" ry="4" width="170" height="340" />
            <Rect x="178" y="285" rx="4" ry="4" width="170" height="392" />
            <Rect x="178" y="682" rx="4" ry="4" width="171" height="38" />
            <Rect x="235" y="515" rx="0" ry="0" width="0" height="1" />
            <Circle cx="165" cy="71" r="59" />
            <Rect x="65" y="138" rx="8" ry="8" width="222" height="15" />
            <Rect x="63" y="159" rx="8" ry="8" width="223" height="14" />
    </ContentLoader>
);
export default AccountLoader;
