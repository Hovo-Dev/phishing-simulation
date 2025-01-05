import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConstructor, default as DataSource } from '../../data-source';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from '../../config/database';
import applicationConfig from '../../config/app';
import { DataSourceOptions } from 'typeorm';
import { getTypeOrmConfig, TypeORMAllRepositories, TypeORMConfiguration } from '../../typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        dbConfig: ConfigType<typeof databaseConfig>,
        appConfig: ConfigType<typeof applicationConfig>,
      ) => getTypeOrmConfig(dbConfig, appConfig),
      dataSourceFactory: async (options: DataSourceOptions) => {
        return options.type == 'sqlite'
          ? DataSource
          : DataSourceConstructor(options);
      },
      inject: [databaseConfig.KEY, applicationConfig.KEY],
    }),
    TypeORMConfiguration,
  ],
  providers: [...TypeORMAllRepositories],
  exports: [TypeORMConfiguration, ...TypeORMAllRepositories],
})
export class DatabaseModule {}
