import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {ConfigModule} from "@nestjs/config";

console.log(join(__dirname, '..', 'public'));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '..', '.env')
    }),
    UserModule,
    CommentModule,
  ],
})
export class AppModule {
}
