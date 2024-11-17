const express = require('express');
const app = express();

const cors = require('cors');
const PORT = 3000;

app.use(cors());

const city = {
    'philadelphia':{
        'city': 'philadelphia',
        'restaurants': {
            'italian':{
                'Vetri Cucina': {
                    'price range': '$$$$',
                    'food category': 'italian',
                    'style':'fine dining',
                },
                'Fiorella':{
                    'price range': ' $$$',
                    'food category': 'italian',
                    'style':'fine dining',
                },
            },
            'mexican':{
                'juno': {
                    'price range': ' $$',
                    'food category': 'mexican',
                    'style':'casual dining',
                },
                'Distrito':{
                    'price range': ' $$',
                    'food category': 'mexican',
                    'style':'casual dining',
                },
            },
            'asian':{
                'Vernick Fish': {
                    'price range': ' $$$',
                    'food category': 'asian',
                    'style':'casual dining',
                },
                'Double Knot': {
                    'price range': '$$-$$$',
                    'food category': 'asian',
                    'style':'casual dining',
                }
            }
        },
        'url': 'https://www.visitphilly.com/wp-content/uploads/2023/10/philly-skyline-schuylkill-kelly-drive-elevated-angles-2200x1237px.jpg'
    },
    'new york':{
        'city': 'new york',
        'restaurants': {
            'italian':{
                'Carbone': {
                    'price range': '$$$$',
                    'food category': 'italian',
                    'style':'fine dining',
                },
                'L’Artusi':{
                    'price range': ' $$$',
                    'food category': 'italian',
                    'style':'fine dining',
                },
            },
            'mexican':{
                'Cosme': {
                    'price range': ' $$$$',
                    'food category': 'mexican',
                    'style':'fine dining',
                },
                'La Esquina':{
                    'price range': ' $$',
                    'food category': 'mexican',
                    'style':'casual dining',
                },
            },
            'asian':{
                'VMomofuku Ko': {
                    'price range': ' $$$$',
                    'food category': 'asian',
                    'style':'fine dining',
                },
                'HanGawi': {
                    'price range': '$$$',
                    'food category': 'asian',
                    'style':'fine dining',
                }
            }
        },
        'url': 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_200,q_75,w_335/v1/clients/boston/216_3_1456_jpeg_4f769de5-4a4a-42d0-847f-118bfeeb1c4e.jpg'
    },
    'washington d.c':{
        'city': 'washington d.c',
        'restaurants': {
            'italian':{
                'RPM Italian': {
                    'price range': '$$$',
                    'food category': 'italian',
                    'style':'casual dining',
                },
                'Fiola':{
                    'price range': ' $$$$',
                    'food category': 'italian',
                    'style':'fine dining',
                },
            },
            'mexican':{
                'Mi Vida': {
                    'price range': ' $$-$$$',
                    'food category': 'mexican',
                    'style':'casual dining',
                },
                'Espita Mezcaleria':{
                    'price range': ' $$-$$$',
                    'food category': 'mexican',
                    'style':'casual dining',
                },
            },
            'asian':{
                'Rasika': {
                    'price range': ' $$$',
                    'food category': 'asian',
                    'style':'casual dining',
                },
                'Maketto': {
                    'price range': '$$',
                    'food category': 'asian',
                    'style':'casual dining',
                }
            }
        },
        'url': 'https://assets.editorial.aetnd.com/uploads/2010/06/washington-dc-gettyimages-74063516.jpg'
    }
};

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
});
app.get('/style.css', (request, response)=>{
    response.sendFile(__dirname + '/style.css')
})

app.get('/main.js', (request, response)=>{
    response.sendFile(__dirname + '/main.js')
})
app.get('/api/:city',(request,response) => {
    const cityName = request.params.city.toLowerCase()

    if( city[cityName] ){
        response.json(city[cityName] )
    }else{
        response.json(city['unknown'])
    }
   
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
});