// Object.freezeを使用しないと外部で値を書き換えることが出来る
// Object.freezeはネストしたオブジェクトまで見ないので、Objectの中でObjectを宣言する場合、宣言するObjectにもObject.freezeをつける
export default Object.freeze({
    VALUE: 1,
    travelName: 'サンプル',
    schedule: [
        {
            dtStart: new Date(),
            //dtEnd: new Date(),
            type:'Attraction',
            name: 'スプラッシュ・マウンテン',
            imgSrc: '..assets/logo.png',
            memo:'さんぷる１'

        },
        {
            dtStart: new Date(),
            //dtEnd: new Date(),
            type:'Attraction',
            name: 'ビッグサンダー・マウンテン',
            imgSrc: '..assets/logo.png',
            memo:'さんぷる２'

        },
        {
            dtStart: new Date(),
            //dtEnd: new Date(),
            type:'Attraction',
            name: 'ドリーミング・アップ！',
            imgSrc: '..assets/logo.png',
            memo:'サンプル３'
        },
    ]
  });
