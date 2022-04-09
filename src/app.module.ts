import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './books/books.module'

dotenv.config();

const {
  NODE_ENV: environment,
  MONGO_HOST: mongoHost,
  MONGO_PORT: mongoPort,
  MONGO_DB: mongoDatabase,
  MONGO_USER: mongoUser,
  MONGO_PASSWORD: mongoPassword,
} = process.env;

let connectionObject;

if (environment !== 'development') {
  connectionObject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsInsecure: true,
  }
}

@Module({
  imports: [
    MongooseModule.forRoot(
      environment === 'development'
        ? `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`
        : `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin&replicaSet=replsetc`,
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    BookModule
  ],
})
export class AppModule {}
