import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

// const http_server = require('http-server'); // JS
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as FileSession from 'session-file-store';
import * as express from 'express';

const FileStore = FileSession(session)

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure:false},
            store: new FileStore(),
        })
    );

    app.use(cookieParser(
        'me gustan los tacos', // secreto
        {  // opciones

        }
    ));
    app.set('view engine', 'ejs');

    app.use(
        express.static('publico')// para hacer publica una carpeta y se pueda acceder
    );

    await app.listen(3000);
}

bootstrap();