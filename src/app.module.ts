import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { TaskEntity } from './tasks/tasks.entity';
import {TaskRepository} from './tasks/tasks.repository'
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env.config.dev']
  }),TypeOrmModule.forRootAsync({

    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>({
    type: 'postgres',
    host: configService.get('DB_Host'),
    port: configService.get('DB_Port'),
    username:configService.get('DB_Username'),
    password:configService.get('DB_Password'),
    database: configService.get('DB_Database'),
    autoLoadEntities:true,
    synchronize:true
    })
    
 
    
  }),TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
