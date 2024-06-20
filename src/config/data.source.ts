import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: process.env.NODE_ENV,
});

const configServices = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configServices.get('DB_HOST'),
  port: configServices.get('DB_PORT'),
  username: configServices.get('DB_USER'),
  password: configServices.get('DB_PASSWORD'),
  database: configServices.get('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
};
export const appDS = new DataSource(DataSourceConfig);
