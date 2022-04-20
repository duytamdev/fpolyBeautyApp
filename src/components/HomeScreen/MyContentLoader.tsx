import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const MyContentLoader = () => (
        <ContentLoader viewBox="0 0 360 725" >
            <Rect x="64" y="71" rx="0" ry="0" width="37" height="0" />
            <Rect x="4" y="3" rx="4" ry="4" width="170" height="258" />
            <Rect x="178" y="4" rx="0" ry="0" width="170" height="313" />
            <Rect x="4" y="266" rx="4" ry="4" width="170" height="340" />
            <Rect x="178" y="322" rx="4" ry="4" width="170" height="392" />
            <Rect x="4" y="613" rx="4" ry="4" width="170" height="98" />
        </ContentLoader>
);
export default MyContentLoader;
