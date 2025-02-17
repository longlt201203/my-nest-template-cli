# My Nest Template CLI

This is the CLI for [My Nest Template](https://github.com/longlt201203/my-nest-template).

## Installation & Update

```shell
npm i -g my-nest-template-cli
```

## Features

### Generate

1. Generate project

```shell
mynest g prj <name>
```

2. Generate module

```shell
mynest g module <name>
```

3. Generate Docker Compose preset

```shell
mynest g docker-compose <preset>
```

_Note:_ `mynest g docker-compose ls` to list all available presets

### Utilities

1. Edit `src/utils/env.ts` file base on `.env.example`

```shell
mynest utils update-env
```

2. Add `FrontModule` for deploy Front-End within API Server

```shell
mynest utils deploy-front
```
