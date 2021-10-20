import React from 'react';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Nhạc Hoa Thịnh Hành',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/b/b/7/9bb7beff525664c33a5d8c67fccd1fc4.jpg',
        },
        {
            id: 2,
            name: 'Rap Việt Xịn Xò',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/b/b/7/9bb7beff525664c33a5d8c67fccd1fc4.jpg',
        },
        {
            id: 3,
            name: 'Che Việt Vip Pro',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/b/b/7/9bb7beff525664c33a5d8c67fccd1fc4.jpg',
        },
    ];

    return (
        <div>
            <h2>Có thể bạn muốn nghe</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;