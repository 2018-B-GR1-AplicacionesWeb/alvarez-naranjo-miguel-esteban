import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

// const http_server = require('http-server'); // JS
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            // name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure:false}
        })
    );

    app.use(cookieParser(
        'me gustan los tacos', // secreto
        {  // opciones

        }
    ));
    app.set('view engine', 'ejs');

    await app.listen(4000);
}

bootstrap();