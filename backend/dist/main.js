/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	/**
	 * @param {boolean=} fromUpdate true when called from update
	 */
	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	}
	return stack;
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(29);
const cookieParser = __webpack_require__(92);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('쇼핑몰 API 문서')
        .setDescription('API 라우터')
        .setVersion('1.0.0')
        .addTag('API 설계')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 8080);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(9);
const config_1 = __webpack_require__(10);
const admin_entity_1 = __webpack_require__(11);
const admin_moule_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(18);
const product_entity_1 = __webpack_require__(15);
const product_categories_entity_1 = __webpack_require__(16);
const product_module_1 = __webpack_require__(36);
const cart_module_1 = __webpack_require__(44);
const cart_entity_1 = __webpack_require__(19);
const address_entity_1 = __webpack_require__(24);
const address_module_1 = __webpack_require__(50);
const order_entity_1 = __webpack_require__(17);
const orderItem_entity_1 = __webpack_require__(21);
const order_module_1 = __webpack_require__(54);
const review_entity_1 = __webpack_require__(22);
const review_module_1 = __webpack_require__(58);
const qna_entity_1 = __webpack_require__(14);
const qna_module_1 = __webpack_require__(62);
const qna_answer_entity_1 = __webpack_require__(13);
const qna_answer_module_1 = __webpack_require__(66);
const order_mng_module_1 = __webpack_require__(70);
const like_product_entity_1 = __webpack_require__(25);
const like_product_module_1 = __webpack_require__(74);
const helpful_review_entity_1 = __webpack_require__(23);
const helpful_review_module_1 = __webpack_require__(78);
const user_module_1 = __webpack_require__(82);
const product_option_entity_1 = __webpack_require__(20);
const jwt_module_1 = __webpack_require__(88);
const user_token_entity_1 = __webpack_require__(26);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    charset: 'utf8mb4',
                    synchronize: false,
                    retryAttempts: 1,
                    retryDelay: 3000,
                    entities: [
                        admin_entity_1.AdminEntity,
                        user_entity_1.UserEntity,
                        user_token_entity_1.UserTokenEntity,
                        product_entity_1.ProductEntity,
                        product_option_entity_1.Product_optionEntity,
                        product_categories_entity_1.ProductCateogryEntity,
                        cart_entity_1.CartEntity,
                        address_entity_1.AddressEntity,
                        order_entity_1.OrderEntity,
                        orderItem_entity_1.OrderItemEntity,
                        review_entity_1.ReviewEntity,
                        qna_entity_1.QnAEntity,
                        qna_answer_entity_1.QnA_AnswerEntity,
                        like_product_entity_1.Like_ProductEntity,
                        helpful_review_entity_1.Helpful_ReviewEntity,
                    ],
                }),
            }),
            admin_moule_1.AdminModule,
            user_module_1.UserModule,
            qna_answer_module_1.QnA_AnswerModule,
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            address_module_1.AddressModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
            qna_module_1.QnAModoule,
            order_mng_module_1.OrderMngModule,
            like_product_module_1.Like_ProductModule,
            helpful_review_module_1.Helpful_ReviewModule,
            jwt_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(6);
const app_service_1 = __webpack_require__(8);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(6);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/typeorm");

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const qna_answer_entity_1 = __webpack_require__(13);
let AdminEntity = class AdminEntity {
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminEntity.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['admin', 'moderator'], default: 'admin' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AdminEntity.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AdminEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_answer_entity_1.QnA_AnswerEntity, (qna_answer) => qna_answer.admin_no),
    __metadata("design:type", typeof (_c = typeof qna_answer_entity_1.QnA_AnswerEntity !== "undefined" && qna_answer_entity_1.QnA_AnswerEntity) === "function" ? _c : Object)
], AdminEntity.prototype, "qna_answer", void 0);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)('admin')
], AdminEntity);


/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnA_AnswerEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const qna_entity_1 = __webpack_require__(14);
const admin_entity_1 = __webpack_require__(11);
let QnA_AnswerEntity = class QnA_AnswerEntity {
};
exports.QnA_AnswerEntity = QnA_AnswerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QnA_AnswerEntity.prototype, "qna_answer_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.AdminEntity, (admin) => admin.admin_id),
    (0, typeorm_1.JoinColumn)({ name: 'admin_no' }),
    __metadata("design:type", Number)
], QnA_AnswerEntity.prototype, "admin_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qna_entity_1.QnAEntity, (qna) => qna.qna_no, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'qna_no' }),
    __metadata("design:type", Number)
], QnA_AnswerEntity.prototype, "qna_no", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 1000,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }),
    __metadata("design:type", String)
], QnA_AnswerEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], QnA_AnswerEntity.prototype, "write_at", void 0);
exports.QnA_AnswerEntity = QnA_AnswerEntity = __decorate([
    (0, typeorm_1.Entity)('qna_answer')
], QnA_AnswerEntity);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnAEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const product_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(18);
const qna_answer_entity_1 = __webpack_require__(13);
const product_option_entity_1 = __webpack_require__(20);
let QnAEntity = class QnAEntity {
};
exports.QnAEntity = QnAEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QnAEntity.prototype, "qna_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", typeof (_a = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _a : Object)
], QnAEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", typeof (_b = typeof product_option_entity_1.Product_optionEntity !== "undefined" && product_option_entity_1.Product_optionEntity) === "function" ? _b : Object)
], QnAEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], QnAEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 50 }),
    __metadata("design:type", String)
], QnAEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 1000,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }),
    __metadata("design:type", String)
], QnAEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], QnAEntity.prototype, "private", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 20 }),
    __metadata("design:type", String)
], QnAEntity.prototype, "private_pwd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QnAEntity.prototype, "answer_yn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], QnAEntity.prototype, "write_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_answer_entity_1.QnA_AnswerEntity, (qna_answer) => qna_answer.qna_no, {
        cascade: true,
    }),
    __metadata("design:type", typeof (_d = typeof qna_answer_entity_1.QnA_AnswerEntity !== "undefined" && qna_answer_entity_1.QnA_AnswerEntity) === "function" ? _d : Object)
], QnAEntity.prototype, "qna_answer", void 0);
exports.QnAEntity = QnAEntity = __decorate([
    (0, typeorm_1.Entity)('qna')
], QnAEntity);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const product_categories_entity_1 = __webpack_require__(16);
const order_entity_1 = __webpack_require__(17);
const review_entity_1 = __webpack_require__(22);
const qna_entity_1 = __webpack_require__(14);
const helpful_review_entity_1 = __webpack_require__(23);
const like_product_entity_1 = __webpack_require__(25);
const product_option_entity_1 = __webpack_require__(20);
let ProductEntity = class ProductEntity {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_categories_entity_1.ProductCateogryEntity, (cateogry) => cateogry.category_id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_category' }),
    __metadata("design:type", typeof (_a = typeof product_categories_entity_1.ProductCateogryEntity !== "undefined" && product_categories_entity_1.ProductCateogryEntity) === "function" ? _a : Object)
], ProductEntity.prototype, "product_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "product_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "product_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['남성', '여성', '남녀공용'], nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ProductEntity.prototype, "reg_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: true,
        default: null,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProductEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.product_no),
    __metadata("design:type", Array)
], ProductEntity.prototype, "product_option", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => order_entity_1.OrderEntity, (order) => order.product_no),
    (0, typeorm_1.JoinColumn)({ name: 'order_no' }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.product_no),
    __metadata("design:type", typeof (_d = typeof review_entity_1.ReviewEntity !== "undefined" && review_entity_1.ReviewEntity) === "function" ? _d : Object)
], ProductEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_entity_1.QnAEntity, (qna) => qna.product_no),
    __metadata("design:type", Array)
], ProductEntity.prototype, "qna", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_product_entity_1.Like_ProductEntity, (like_product) => like_product.product_no),
    __metadata("design:type", typeof (_e = typeof like_product_entity_1.Like_ProductEntity !== "undefined" && like_product_entity_1.Like_ProductEntity) === "function" ? _e : Object)
], ProductEntity.prototype, "like_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => helpful_review_entity_1.Helpful_ReviewEntity, (helpful_review) => helpful_review.product_no),
    __metadata("design:type", typeof (_f = typeof helpful_review_entity_1.Helpful_ReviewEntity !== "undefined" && helpful_review_entity_1.Helpful_ReviewEntity) === "function" ? _f : Object)
], ProductEntity.prototype, "helpful_review", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)('product')
], ProductEntity);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCateogryEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const product_entity_1 = __webpack_require__(15);
let ProductCateogryEntity = class ProductCateogryEntity {
};
exports.ProductCateogryEntity = ProductCateogryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductCateogryEntity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ProductCateogryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ProductCateogryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCateogryEntity, (category) => category.children, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", ProductCateogryEntity)
], ProductCateogryEntity.prototype, "parent_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductCateogryEntity, (category) => category.parent_id),
    __metadata("design:type", Array)
], ProductCateogryEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (category) => category.product_category),
    __metadata("design:type", Array)
], ProductCateogryEntity.prototype, "product_category", void 0);
exports.ProductCateogryEntity = ProductCateogryEntity = __decorate([
    (0, typeorm_1.Entity)('product_categories')
], ProductCateogryEntity);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(18);
const product_entity_1 = __webpack_require__(15);
const address_entity_1 = __webpack_require__(24);
const orderItem_entity_1 = __webpack_require__(21);
let OrderEntity = class OrderEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "order_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.ProductEntity, (product) => product.order),
    (0, typeorm_1.JoinTable)({
        name: 'order_product_no',
        joinColumn: {
            name: 'order_no',
            referencedColumnName: 'order_no',
        },
        inverseJoinColumn: {
            name: 'product_no',
            referencedColumnName: 'product_id',
        },
    }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1, nullable: false }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        default: '주문 완료',
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "order_state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "refund_reason", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.AddressEntity, (address) => address.address_no),
    (0, typeorm_1.JoinColumn)({ name: 'address_no' }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "address_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrderEntity.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OrderEntity.prototype, "order_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItemEntity, (orderItem) => orderItem.order_no, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "orderItem", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)('order')
], OrderEntity);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const cart_entity_1 = __webpack_require__(19);
const address_entity_1 = __webpack_require__(24);
const orderItem_entity_1 = __webpack_require__(21);
const order_entity_1 = __webpack_require__(17);
const review_entity_1 = __webpack_require__(22);
const qna_entity_1 = __webpack_require__(14);
const helpful_review_entity_1 = __webpack_require__(23);
const like_product_entity_1 = __webpack_require__(25);
const user_token_entity_1 = __webpack_require__(26);
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserEntity.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_token_entity_1.UserTokenEntity, (user_token) => user_token.user_id),
    __metadata("design:type", typeof (_c = typeof user_token_entity_1.UserTokenEntity !== "undefined" && user_token_entity_1.UserTokenEntity) === "function" ? _c : Object)
], UserEntity.prototype, "user_token", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.CartEntity, (cart) => cart.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.AddressEntity, (address) => address.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItemEntity, (orderItem) => orderItem.user_id),
    __metadata("design:type", Array)
], UserEntity.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.user_id),
    __metadata("design:type", typeof (_d = typeof review_entity_1.ReviewEntity !== "undefined" && review_entity_1.ReviewEntity) === "function" ? _d : Object)
], UserEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_entity_1.QnAEntity, (qna) => qna.user_id),
    __metadata("design:type", typeof (_e = typeof qna_entity_1.QnAEntity !== "undefined" && qna_entity_1.QnAEntity) === "function" ? _e : Object)
], UserEntity.prototype, "qna", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_product_entity_1.Like_ProductEntity, (like_product) => like_product.user_id),
    __metadata("design:type", typeof (_f = typeof like_product_entity_1.Like_ProductEntity !== "undefined" && like_product_entity_1.Like_ProductEntity) === "function" ? _f : Object)
], UserEntity.prototype, "like_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => helpful_review_entity_1.Helpful_ReviewEntity, (helpful_review) => helpful_review.user_id),
    __metadata("design:type", typeof (_g = typeof helpful_review_entity_1.Helpful_ReviewEntity !== "undefined" && helpful_review_entity_1.Helpful_ReviewEntity) === "function" ? _g : Object)
], UserEntity.prototype, "helpful_review", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(18);
const product_option_entity_1 = __webpack_require__(20);
let CartEntity = class CartEntity {
};
exports.CartEntity = CartEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartEntity.prototype, "cart_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], CartEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", typeof (_a = typeof product_option_entity_1.Product_optionEntity !== "undefined" && product_option_entity_1.Product_optionEntity) === "function" ? _a : Object)
], CartEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1, nullable: false }),
    __metadata("design:type", Number)
], CartEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CartEntity.prototype, "create_at", void 0);
exports.CartEntity = CartEntity = __decorate([
    (0, typeorm_1.Entity)('cart')
], CartEntity);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product_optionEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const product_entity_1 = __webpack_require__(15);
const orderItem_entity_1 = __webpack_require__(21);
const cart_entity_1 = __webpack_require__(19);
const review_entity_1 = __webpack_require__(22);
const qna_entity_1 = __webpack_require__(14);
let Product_optionEntity = class Product_optionEntity {
};
exports.Product_optionEntity = Product_optionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", typeof (_a = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _a : Object)
], Product_optionEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Product_optionEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['XS(85)', 'S(90)', 'M(95)', 'L(100)', 'XL(105)', 'XXL(110)'],
    }),
    __metadata("design:type", String)
], Product_optionEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Product_optionEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Product_optionEntity.prototype, "reg_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Product_optionEntity.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItemEntity, (orderItem) => orderItem.option_id),
    __metadata("design:type", Array)
], Product_optionEntity.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.CartEntity, (cart) => cart.option_id),
    __metadata("design:type", Array)
], Product_optionEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qna_entity_1.QnAEntity, (qna) => qna.option_id),
    __metadata("design:type", Array)
], Product_optionEntity.prototype, "qna", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.option_id),
    __metadata("design:type", typeof (_d = typeof review_entity_1.ReviewEntity !== "undefined" && review_entity_1.ReviewEntity) === "function" ? _d : Object)
], Product_optionEntity.prototype, "review", void 0);
exports.Product_optionEntity = Product_optionEntity = __decorate([
    (0, typeorm_1.Entity)('product_option')
], Product_optionEntity);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderItemEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const order_entity_1 = __webpack_require__(17);
const user_entity_1 = __webpack_require__(18);
const product_option_entity_1 = __webpack_require__(20);
let OrderItemEntity = class OrderItemEntity {
};
exports.OrderItemEntity = OrderItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "orderItem_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, (order) => order.order_no, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'order_no' }),
    __metadata("design:type", typeof (_a = typeof order_entity_1.OrderEntity !== "undefined" && order_entity_1.OrderEntity) === "function" ? _a : Object)
], OrderItemEntity.prototype, "order_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", typeof (_b = typeof product_option_entity_1.Product_optionEntity !== "undefined" && product_option_entity_1.Product_optionEntity) === "function" ? _b : Object)
], OrderItemEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "unit_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], OrderItemEntity.prototype, "review_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], OrderItemEntity.prototype, "create_at", void 0);
exports.OrderItemEntity = OrderItemEntity = __decorate([
    (0, typeorm_1.Entity)('order_items')
], OrderItemEntity);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const product_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(18);
const helpful_review_entity_1 = __webpack_require__(23);
const product_option_entity_1 = __webpack_require__(20);
let ReviewEntity = class ReviewEntity {
};
exports.ReviewEntity = ReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "review_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_option_entity_1.Product_optionEntity, (product_option) => product_option.option_id),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "option_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        length: 1000,
    }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: false }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ReviewEntity.prototype, "write_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => helpful_review_entity_1.Helpful_ReviewEntity, (helpful_review) => helpful_review.review_no),
    __metadata("design:type", Array)
], ReviewEntity.prototype, "helpful_review", void 0);
exports.ReviewEntity = ReviewEntity = __decorate([
    (0, typeorm_1.Entity)('review')
], ReviewEntity);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helpful_ReviewEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(18);
const product_entity_1 = __webpack_require__(15);
const review_entity_1 = __webpack_require__(22);
let Helpful_ReviewEntity = class Helpful_ReviewEntity {
};
exports.Helpful_ReviewEntity = Helpful_ReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "review_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Helpful_ReviewEntity.prototype, "press_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => review_entity_1.ReviewEntity, (review) => review.review_no),
    (0, typeorm_1.JoinColumn)({ name: 'review_no' }),
    __metadata("design:type", Number)
], Helpful_ReviewEntity.prototype, "review", void 0);
exports.Helpful_ReviewEntity = Helpful_ReviewEntity = __decorate([
    (0, typeorm_1.Entity)('helpful_review'),
    (0, typeorm_1.Unique)(['review_no', 'user_id', 'product_no'])
], Helpful_ReviewEntity);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(18);
let AddressEntity = class AddressEntity {
};
exports.AddressEntity = AddressEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AddressEntity.prototype, "address_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], AddressEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AddressEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AddressEntity.prototype, "zip_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AddressEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AddressEntity.prototype, "detail_addr", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Y', 'N'], default: 'N' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "default_addr", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
        default: '조심히 안전하게 배송해주세요.',
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "deliveryMsg", void 0);
exports.AddressEntity = AddressEntity = __decorate([
    (0, typeorm_1.Entity)('address')
], AddressEntity);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Like_ProductEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(18);
const product_entity_1 = __webpack_require__(15);
let Like_ProductEntity = class Like_ProductEntity {
};
exports.Like_ProductEntity = Like_ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Like_ProductEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Like_ProductEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Like_ProductEntity.prototype, "like_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.product_id),
    (0, typeorm_1.JoinColumn)({ name: 'product_no' }),
    __metadata("design:type", Number)
], Like_ProductEntity.prototype, "product", void 0);
exports.Like_ProductEntity = Like_ProductEntity = __decorate([
    (0, typeorm_1.Entity)('like_product')
], Like_ProductEntity);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTokenEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(18);
let UserTokenEntity = class UserTokenEntity {
};
exports.UserTokenEntity = UserTokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserTokenEntity.prototype, "token_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserTokenEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], UserTokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], UserTokenEntity.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserTokenEntity.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserTokenEntity.prototype, "expires_at", void 0);
exports.UserTokenEntity = UserTokenEntity = __decorate([
    (0, typeorm_1.Entity)('user_token')
], UserTokenEntity);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const admin_controller_1 = __webpack_require__(28);
const admin_entity_1 = __webpack_require__(11);
const admin_service_1 = __webpack_require__(33);
const order_entity_1 = __webpack_require__(17);
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, order_entity_1.OrderEntity])],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const admin_dto_1 = __webpack_require__(31);
const admin_service_1 = __webpack_require__(33);
const public_decorator_1 = __webpack_require__(35);
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createAdmin(createAdminDto, res) {
        try {
            await this.adminService.duplicateEmail(createAdminDto.email);
            const hashPassword = await this.adminService.hashPassword(createAdminDto.password);
            createAdminDto.password = hashPassword;
            const result = await this.adminService.createAdmin(createAdminDto);
            if (result.success === true) {
                res.status(200).json({ message: '관리자 계정 생성 완료' });
            }
            else {
                res.status(403).json({ message: '생성 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async adminLogin(adminLoginDto, res) {
        const result = await this.adminService.adminLogin(adminLoginDto);
        if (result.login_success === true) {
            res.status(200).json({ message: '로그인 성공' });
        }
        else {
            res.status(403).json({ message: '로그인 실패' });
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '관리자 생성 경로' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof admin_dto_1.CreateAdminDto !== "undefined" && admin_dto_1.CreateAdminDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '관리자 로그인 경로' }),
    (0, common_1.Post)('admin_login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof admin_dto_1.AdminLoginDto !== "undefined" && admin_dto_1.AdminLoginDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminLogin", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin/manage'),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('admin/'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);


/***/ }),
/* 29 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 30 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminLoginDto = exports.CreateAdminDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class CreateAdminDto {
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '홍길동',
        description: '관리자 이름',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin@naver.com',
        description: '관리자 계정',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin123123',
        description: '관리자 비밀번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
class AdminLoginDto {
}
exports.AdminLoginDto = AdminLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin@naver.com',
        description: '관리자 계정',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin123123',
        description: '관리자 비밀번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "password", void 0);


/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const admin_entity_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const bcrypt = __webpack_require__(34);
const order_entity_1 = __webpack_require__(17);
let AdminService = class AdminService {
    constructor(admin, orderRepository) {
        this.admin = admin;
        this.orderRepository = orderRepository;
    }
    async duplicateEmail(email) {
        let admin = await this.admin.findOne({
            where: { email: email },
        });
        if (admin) {
            throw new common_1.BadRequestException('이미 가입된 계정입니다.');
        }
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 11);
    }
    async createAdmin(createAdminDto) {
        try {
            const createAdmin = await this.admin.create(createAdminDto);
            await this.admin.save(createAdmin);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async adminLogin(adminLogin) {
        try {
            let admin = await this.admin.findOne({
                where: {
                    email: adminLogin.email,
                },
            });
            if (!admin) {
                throw new common_1.BadRequestException('존재하지 않은 관리자 정보입니다.');
            }
            const comparePassword = await bcrypt.compare(adminLogin.password, admin.password);
            if (!comparePassword) {
                throw new common_1.BadRequestException('비밀번호가 일치하지 않습니다.');
            }
            return { login_success: true };
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], AdminService);


/***/ }),
/* 34 */
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(6);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const cache_manager_1 = __webpack_require__(37);
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const cache_manager_redis_store_1 = __webpack_require__(38);
const product_controller_1 = __webpack_require__(39);
const product_entity_1 = __webpack_require__(15);
const product_categories_entity_1 = __webpack_require__(16);
const product_option_entity_1 = __webpack_require__(20);
const product_service_1 = __webpack_require__(42);
const user_token_entity_1 = __webpack_require__(26);
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.ProductEntity,
                product_categories_entity_1.ProductCateogryEntity,
                product_option_entity_1.Product_optionEntity,
                user_token_entity_1.UserTokenEntity
            ]),
            cache_manager_1.CacheModule.register({
                store: cache_manager_redis_store_1.redisStore,
                host: 'localhost',
                port: 6379,
                ttl: 600,
                isGlobal: true,
            }),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
    })
], ProductModule);


/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 38 */
/***/ ((module) => {

"use strict";
module.exports = require("cache-manager-redis-store");

/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const public_decorator_1 = __webpack_require__(35);
const product_dto_1 = __webpack_require__(40);
const product_service_1 = __webpack_require__(42);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async randomProduct(res) {
        try {
            const result = await this.productService.randomProduct();
            res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectProductCategory(category_id) {
        if (!category_id) {
            throw new common_1.BadRequestException('카테고리 넘버가 없습니다.');
        }
        return await this.productService.selectProductCategory(category_id);
    }
    async selectProduct(product_category) {
        if (!product_category) {
            throw new common_1.BadRequestException('카테고리 넘버가 없습니다.');
        }
        return await this.productService.selectProduct(product_category);
    }
    async selectOneProduct(product_id) {
        if (!product_id) {
            throw new common_1.BadRequestException('제품 넘버가 없습니다. 다시 확인해 주세요.');
        }
        return await this.productService.selectOneProduct(product_id);
    }
    async insertProduct(regProductDto, res) {
        try {
            const result = await this.productService.insertProduct(regProductDto);
            if (result.success === true) {
                res
                    .status(200)
                    .json({ message: '제품 등록이 완료되었습니다.', result: result });
            }
            else {
                res.json(403).json({
                    message: '데이터 등록에 실패하였습니다. 입력한 값을 다시 한 번 확인해 주세요.',
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateProduct(updateProductDto, res) {
        try {
            const result = await this.productService.updateProduct(updateProductDto);
            if (result.success === true) {
                res.status(200).json({ message: '정보 수정이 완료되었습니다.' });
            }
            else {
                res.status(403).json({
                    message: '정보 수정에 실패하였습니다. 정보를 다시 확인해 주세요.',
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '10분마다 랜덤한 상품 데이터 5개를 가져옴' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/random_product'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "randomProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'product_category 테이블에 해당 번호의 자식 데이터를 가져옴',
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_category/:category_id'),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "selectProductCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '입력 받은 값에 대한 product 데이터 정보를 가져옴' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_products/:product_category'),
    __param(0, (0, common_1.Param)('product_category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "selectProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 제품 정보 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_product/:product_id'),
    __param(0, (0, common_1.Param)('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "selectOneProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '제품 등록 라우터' }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof product_dto_1.RegProductDto !== "undefined" && product_dto_1.RegProductDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "insertProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '제품 정보 수정 라우터' }),
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof product_dto_1.UpdateProductDto !== "undefined" && product_dto_1.UpdateProductDto) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = exports.RegProductDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
const product_enum_1 = __webpack_require__(41);
class RegProductDto {
}
exports.RegProductDto = RegProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 카테고리 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "product_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '~~반팔',
        description: '제품 이름',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '여름에 입기 좋은 얇은 반팔입니다.',
        description: '제품 설명',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "product_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '[남성, 여성, 남녀공용]',
        description: '성별',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(product_enum_1.Gender),
    __metadata("design:type", typeof (_a = typeof product_enum_1.Gender !== "undefined" && product_enum_1.Gender) === "function" ? _a : Object)
], RegProductDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 사이즈',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 색상',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegProductDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '50,000',
        description: '제품 가격',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '50,000 -> 39,900',
        description: '제품 세일 가격',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "sale_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10개',
        description: '제품 수량',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegProductDto.prototype, "stock", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 설명',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "product_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 가격',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '세일 가격', required: false }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "sale_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 수량', required: false }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["male"] = "\uB0A8\uC131";
    Gender["female"] = "\uC5EC\uC131";
    Gender["unisex"] = "\uB0A8\uB140\uACF5\uC6A9";
})(Gender || (exports.Gender = Gender = {}));


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const cache_manager_1 = __webpack_require__(37);
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const cache_manager_2 = __webpack_require__(43);
const product_entity_1 = __webpack_require__(15);
const product_categories_entity_1 = __webpack_require__(16);
const product_option_entity_1 = __webpack_require__(20);
const typeorm_2 = __webpack_require__(12);
let ProductService = class ProductService {
    constructor(productRepository, productCategoryRepository, product_optionRepository, cacheManager) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.product_optionRepository = product_optionRepository;
        this.cacheManager = cacheManager;
    }
    async randomProduct() {
        try {
            const cacheKey = process.env.CACHE_KEY;
            const cacheData = await this.cacheManager.get(cacheKey);
            if (cacheData) {
                return cacheData;
            }
            const result = await this.productRepository
                .createQueryBuilder('product')
                .leftJoin('like_product', 'like_product', 'like_product.product_no = product.product_id')
                .select([
                'product.brand AS brand',
                'product.product_id AS product_id',
                'product.product_name AS product_name',
                'product.price AS price',
                'IFNULL(COUNT(like_product.product_no), 0) AS like_product',
            ])
                .groupBy('product.product_id')
                .orderBy('RAND()')
                .limit(5)
                .getRawMany();
            await this.cacheManager.set(cacheKey, result, 600);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectProductCategory(category_id) {
        const categoryResult = await this.productCategoryRepository.find({
            where: { parent_id: { category_id } },
            relations: ['children'],
        });
        if (!categoryResult) {
            throw new common_1.BadRequestException('정보가 없습니다.');
        }
        return categoryResult;
    }
    async selectProduct(product_category) {
        const category = await this.productCategoryRepository
            .createQueryBuilder('product_category')
            .leftJoinAndSelect('product_category.children', 'children_category')
            .where('product_category.parent_id = :parent_id OR product_category.category_id = :parent_id', {
            parent_id: product_category,
        })
            .getMany();
        const categoryResult = category.map((category) => category.category_id);
        const ProductResult = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.product_category', 'category')
            .leftJoin('review', 'review', 'review.product_no = product.product_id')
            .leftJoin('like_product', 'like_product', 'like_product.product_no = product.product_id')
            .where('product.product_category IN (:...categoryResult)', {
            categoryResult,
        })
            .select([
            'product.product_id AS product_id',
            'product.product_name AS product_name',
            'product.price AS price',
            'product.reg_at AS reg_at',
            'product.update_at AS updated_at',
            'product.product_category AS product_category',
            'IFNULL(COUNT(review.product_no), 0) AS review_count',
            'IFNULL(ROUND(AVG(review.scope), 1), 0) AS review_scope',
            'IFNULL(COUNT(like_product.product_no), 0) as liked_count',
        ])
            .groupBy('product.product_id')
            .getRawMany();
        return ProductResult;
    }
    async selectOneProduct(product_id) {
        try {
            const selectProduct = await this.productRepository
                .createQueryBuilder('product')
                .leftJoin('product.product_option', 'product_option', 'product_option.product_no = product.product_id')
                .leftJoin((qb) => qb
                .select('review.product_no', 'product_no')
                .addSelect('COUNT(review.product_no) AS review_count')
                .addSelect('AVG(review.scope) AS review_scope')
                .from('review', 'review')
                .groupBy('review.product_no'), 'review', 'review.product_no = product.product_id')
                .leftJoin((qd) => qd
                .select('qna.product_no', 'product_no')
                .addSelect('COUNT(qna.product_no) AS qna_count')
                .from('qna', 'qna')
                .groupBy('qna.product_no'), 'qna', 'qna.product_no = product.product_id')
                .leftJoin((qb) => qb
                .select('like_product.product_no', 'product_no')
                .addSelect('COUNT(like_product.product_no) AS liked_count')
                .from('like_product', 'like_product')
                .groupBy('like_product.product_no'), 'like_product', 'like_product.product_no = product.product_id')
                .where('product.product_id = :product_id', { product_id })
                .select([
                'product.brand AS brand',
                'product.product_name AS product_name',
                'product.product_content AS product_content',
                'product.gender AS gender',
                'product.price AS price',
                'product.sale_price AS sale_price',
                'IFNULL(product_option.color, "") AS color',
                'IFNULL(product_option.size, "") AS size',
                'IFNULL(product_option.stock, 0) AS stock',
                'IFNULL(review.review_count, 0) AS review_count',
                'IFNULL(ROUND(review.review_scope, 1), 0) AS review_scope',
                'IFNULL(qna.qna_count, 0) AS qna_count',
                'IFNULL(like_product.liked_count, 0) as liked_count',
            ])
                .getRawMany();
            return selectProduct;
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertProduct(regProductDto) {
        const product_category = await this.productCategoryRepository.findOne({
            where: { category_id: regProductDto.product_category },
            select: ['category_id'],
        });
        const productData = {
            ...regProductDto,
            product_category,
        };
        try {
            const result = await this.productRepository.create(productData);
            await this.productRepository.save(result);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async insertProductOption() { }
    async updateProduct(updateProductDto) {
        const productId = await this.productRepository.findOne({
            where: { product_id: updateProductDto.product_id },
        });
        if (!productId) {
            throw new common_1.BadRequestException('존재하지 않는 제품 번호입니다.');
        }
        updateProductDto.product_id = productId.product_id;
        try {
            await this.productRepository.update(updateProductDto.product_id, updateProductDto);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_categories_entity_1.ProductCateogryEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(product_option_entity_1.Product_optionEntity)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _d : Object])
], ProductService);


/***/ }),
/* 43 */
/***/ ((module) => {

"use strict";
module.exports = require("cache-manager");

/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const cart_controller_1 = __webpack_require__(45);
const cart_entity_1 = __webpack_require__(19);
const cart_service_1 = __webpack_require__(47);
const product_option_entity_1 = __webpack_require__(20);
const user_token_entity_1 = __webpack_require__(26);
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cart_entity_1.CartEntity, product_option_entity_1.Product_optionEntity, user_token_entity_1.UserTokenEntity])],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService],
    })
], CartModule);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const cart_dto_1 = __webpack_require__(46);
const cart_service_1 = __webpack_require__(47);
const jwt_service_guard_1 = __webpack_require__(48);
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async selectCart(user_id, res) {
        console.log(user_id);
        try {
            const result = await this.cartService.selectCart(user_id);
            if (result.success === true) {
                res.status(200).json({ result });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertCart(insertCartDto, res) {
        try {
            console.log(insertCartDto);
            const result = await this.cartService.insertCart(insertCartDto);
            if (result.success === true) {
                res.status(200).json({ message: '장바구니에 저장되었습니다.' });
            }
            else {
                res.status(403).json({ message: '장바구니 저장이 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteCart(deleteCartDto, res) {
        try {
            const result = await this.cartService.DeleteCart(deleteCartDto);
            if (result.success === true) {
                res
                    .status(200)
                    .json({ message: '제품이 장바구니에서 제거되었습니다.' });
            }
            else {
                res
                    .status(403)
                    .json({ message: '제품을 장바구니에서 제거하지 못했습니다.' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateCart(updateCartDto, res) {
        try {
            const result = await this.cartService.UdpateCart(updateCartDto);
            if (result.success === true) {
                res.status(200).json({ message: '제품 수량 변경 성공' });
            }
            else {
                res.status(403).json({ message: '제품 수량 변경 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 내역' }),
    (0, common_1.Get)('/select/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "selectCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 저장 라우터' }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof cart_dto_1.InsertCartDto !== "undefined" && cart_dto_1.InsertCartDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "insertCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 삭제 라우터' }),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof cart_dto_1.DeleteCartDto !== "undefined" && cart_dto_1.DeleteCartDto) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '장바구니 수량 업데이트 라우터' }),
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof cart_dto_1.UpdateCartDto !== "undefined" && cart_dto_1.UpdateCartDto) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [typeof (_a = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _a : Object])
], CartController);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCartDto = exports.DeleteCartDto = exports.InsertCartDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
const product_option_entity_1 = __webpack_require__(20);
class InsertCartDto {
}
exports.InsertCartDto = InsertCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertCartDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 넘버값',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", typeof (_a = typeof product_option_entity_1.Product_optionEntity !== "undefined" && product_option_entity_1.Product_optionEntity) === "function" ? _a : Object)
], InsertCartDto.prototype, "option_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수량',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertCartDto.prototype, "quantity", void 0);
class DeleteCartDto {
}
exports.DeleteCartDto = DeleteCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '장바구니 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCartDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 아이디 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCartDto.prototype, "user_id", void 0);
class UpdateCartDto {
}
exports.UpdateCartDto = UpdateCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '장바구니 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCartDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수량',
        required: true,
    }),
    __metadata("design:type", Number)
], UpdateCartDto.prototype, "quantity", void 0);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const cart_entity_1 = __webpack_require__(19);
const typeorm_2 = __webpack_require__(12);
let CartService = class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async selectCart(user_id) {
        try {
            const result = await this.cartRepository.find({
                where: { user_id: user_id },
                relations: ['option_id'],
            });
            return { success: true, result: result };
        }
        catch (error) {
            console.error(error);
            return { message: '없어요' };
        }
    }
    async insertCart(insertCartDto) {
        try {
            const findCart = await this.cartRepository.findOne({
                where: insertCartDto,
            });
            if (findCart) {
                const newQuantity = findCart.quantity + insertCartDto.quantity;
                await this.cartRepository.update(findCart.cart_id, {
                    quantity: newQuantity,
                });
                return { success: true };
            }
            else {
                const result = this.cartRepository.create(insertCartDto);
                await this.cartRepository.save(result);
                return { success: true };
            }
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async DeleteCart(deleteCartDto) {
        try {
            const findCart = await this.cartRepository.findOne({
                where: { cart_id: deleteCartDto.cart_id },
            });
            if (!findCart) {
                throw new common_1.BadRequestException('장바구니에 존재하지 않는 제품입니다.');
            }
            await this.cartRepository.delete(deleteCartDto);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async UdpateCart(updateCartDto) {
        try {
            const findCart = await this.cartRepository.findOne({
                where: { cart_id: updateCartDto.cart_id },
            });
            if (!findCart) {
                throw new common_1.BadRequestException('장바구니에 해당 제품이 없습니다.');
            }
            await this.cartRepository.update(updateCartDto.cart_id, {
                quantity: updateCartDto.quantity,
            });
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CartService);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtServiceAuthGuard = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(10);
const core_1 = __webpack_require__(4);
const jwt_1 = __webpack_require__(49);
const typeorm_1 = __webpack_require__(9);
const user_token_entity_1 = __webpack_require__(26);
const typeorm_2 = __webpack_require__(12);
const express_1 = __webpack_require__(30);
let JwtServiceAuthGuard = class JwtServiceAuthGuard {
    constructor(reflector, jwtService, configService, user_token) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
        this.user_token = user_token;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const accessToken = request.cookies['shop_access_token'];
        const refreshToken = request.cookies['shop_refresh_token'];
        const device_id = request.headers['device-id'];
        const requestUserId = request.body.user_id || request.params.user_id;
        console.log(request);
        if (!accessToken) {
            throw new common_1.UnauthorizedException();
        }
        await this.checkRefreshToken(requestUserId, device_id, refreshToken);
        const access_payload = await this.checkAccessToken(accessToken);
        if (Number(requestUserId) !== access_payload.user_id) {
            throw new common_1.UnauthorizedException('아이디 넘버가 일치하지 않습니다.');
        }
        request.user = access_payload;
        const storeToken = await this.user_token.findOne({
            where: {
                user_id: request.user.user_id,
                device_id: device_id,
                token: refreshToken,
            },
        });
        if (!storeToken) {
            throw new common_1.UnauthorizedException('refresh_token이 존재하지 않습니다.');
        }
        else {
            try {
                const payloadRefreshToken = await this.jwtService.verifyAsync(refreshToken, { secret: this.configService.get('JWT_SECRET_KEY') });
                const newAccessToken = this.jwtService.sign({
                    user_id: payloadRefreshToken.user_id,
                    email: payloadRefreshToken.email,
                    name: payloadRefreshToken.name,
                }, {
                    secret: this.configService.get('JWT_SECRET_KEY'),
                    expiresIn: '1h',
                });
                response.cookie('shop_access_token', newAccessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                });
                request.user = payloadRefreshToken;
                return true;
            }
            catch (error) {
                await this.user_token.delete({
                    user_id: request?.user.user_id,
                    device_id: device_id,
                });
                response.clearCookie('shop_access_token');
                response.clearCookie('shop_refresh_token');
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다. 다시 로그인해 주세요.');
            }
        }
    }
    async checkRefreshToken(user_id, device_id, refreshToken) {
        try {
            const payloadRefreshToken = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            return true;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('만료된 refreshToken입니다.');
                await this.user_token.delete({
                    user_id: user_id,
                    device_id: device_id,
                    token: refreshToken,
                });
                express_1.response.clearCookie('shop_access_token');
                express_1.response.clearCookie('shop_refresh_token');
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다. 다시 로그인해 주세요.');
            }
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async checkAccessToken(accessToken) {
        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            return payload;
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.JwtServiceAuthGuard = JwtServiceAuthGuard;
exports.JwtServiceAuthGuard = JwtServiceAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_token_entity_1.UserTokenEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], JwtServiceAuthGuard);


/***/ }),
/* 49 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const address_controller_1 = __webpack_require__(51);
const address_entity_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(18);
const address_service_1 = __webpack_require__(53);
const user_token_entity_1 = __webpack_require__(26);
let AddressModule = class AddressModule {
};
exports.AddressModule = AddressModule;
exports.AddressModule = AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([address_entity_1.AddressEntity, user_entity_1.UserEntity, user_token_entity_1.UserTokenEntity])],
        controllers: [address_controller_1.AddressController],
        providers: [address_service_1.AddressService],
    })
], AddressModule);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const address_dto_1 = __webpack_require__(52);
const address_service_1 = __webpack_require__(53);
const jwt_service_guard_1 = __webpack_require__(48);
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async selectAddress(user_id, res) {
        console.log(user_id);
        try {
            const result = await this.addressService.selectAddress(user_id);
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertAddress(insertAddressDto, res) {
        try {
            const result = await this.addressService.insertAddress(insertAddressDto);
            if (result.success === true) {
                res.status(200).json({ message: '배송지 저장 성공' });
            }
            else {
                res.status(403).json({ message: '배송지 저장 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateAddress(updateAddressDto, res) {
        try {
            const result = await this.addressService.updateDefaultAddress(updateAddressDto);
            if (result.success === true) {
                res.status(200).json({ message: '변경 완료' });
            }
            else {
                res.status(403).json({ message: '변경 실패' });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async DeleteAddressDto(deleteAddressDto, res) {
        try {
            const result = await this.addressService.deleteAddress(deleteAddressDto);
            if (result.success === true) {
                res.status(200).json({ message: '삭제 완료' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(403).json({ message: '삭제 실패' });
        }
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자 주문지 확인 라우터' }),
    (0, common_1.Get)('/select/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "selectAddress", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 배송지 저장 라우터' }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof address_dto_1.InsertAddressDto !== "undefined" && address_dto_1.InsertAddressDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "insertAddress", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '기본 배송지 변경 라우터' }),
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof address_dto_1.UpdateAddressDto !== "undefined" && address_dto_1.UpdateAddressDto) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 배송지 삭제 라우터' }),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof address_dto_1.DeleteAddressDto !== "undefined" && address_dto_1.DeleteAddressDto) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "DeleteAddressDto", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [typeof (_a = typeof address_service_1.AddressService !== "undefined" && address_service_1.AddressService) === "function" ? _a : Object])
], AddressController);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteAddressDto = exports.UpdateAddressDto = exports.InsertAddressDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class InsertAddressDto {
}
exports.InsertAddressDto = InsertAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertAddressDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주문자 이름',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '우편번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "zip_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '배송지 주소',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '배송지 상세 주소',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "detail_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기본 배송지 지정 여부',
        default: ['Y', 'N'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "default_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '요청 시 주문 사항',
        default: '조심히 안전하게 배송해주세요.',
        required: false,
        maxLength: 300
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertAddressDto.prototype, "deliveryMsg", void 0);
class UpdateAddressDto {
}
exports.UpdateAddressDto = UpdateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 배송지 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기본 배송지 설정 여부 (Y -> N으로 변경하거나 혹은 그 반대)',
        enum: ['Y', 'N'],
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "default_addr", void 0);
class DeleteAddressDto {
}
exports.DeleteAddressDto = DeleteAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기본 배송지 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteAddressDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteAddressDto.prototype, "user_id", void 0);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const address_entity_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
let AddressService = class AddressService {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
    async selectAddress(user_id) {
        try {
            const addressList = await this.addressRepository.find({
                where: { user_id: user_id },
            });
            return addressList;
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertAddress(insertAddressDto) {
        const findUser = await this.userRepository.findOne({
            where: { user_id: insertAddressDto.user_id },
        });
        if (!findUser) {
            throw new common_1.BadRequestException('존재하지 않는 회원입니다.');
        }
        try {
            if (insertAddressDto.default_addr === 'Y') {
                await this.handleDefaultAddr(insertAddressDto);
                return {
                    success: true,
                    message: '기존 기본 배송지 수정 및 저장 완료',
                };
            }
            else {
                await this.saveDefaultAddress(insertAddressDto);
                return { success: true, message: '기본 배송지 설정 완료' };
            }
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async handleDefaultAddr(insertAddressDto) {
        const default_addr = await this.addressRepository.findOne({
            select: ['address_no', 'default_addr'],
            where: { user_id: insertAddressDto.user_id, default_addr: 'Y' },
        });
        if (default_addr) {
            await this.changeDefaultAdrr(default_addr);
        }
        await this.saveDefaultAddress(insertAddressDto);
    }
    async changeDefaultAdrr(default_addr) {
        try {
            if (default_addr.default_addr === 'Y') {
                await this.addressRepository.update(default_addr.address_no, {
                    default_addr: 'N',
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveDefaultAddress(insertAddressDto) {
        const result = this.addressRepository.create(insertAddressDto);
        await this.addressRepository.save(result);
    }
    async updateDefaultAddress(updateAddressDto) {
        try {
            const findDefaulAddr = await this.addressRepository.findOne({
                where: { user_id: updateAddressDto.user_id, default_addr: 'Y' },
            });
            if (findDefaulAddr) {
                await this.addressRepository.update(findDefaulAddr.address_no, {
                    default_addr: 'N',
                });
            }
            await this.addressRepository.update(updateAddressDto.address_no, updateAddressDto);
            return { success: true, message: '기본 배송지 설정 변경 완료' };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: '변경 실패' };
        }
    }
    async deleteAddress(deleteAddressDto) {
        try {
            await this.addressRepository.delete(deleteAddressDto);
            return { success: true, message: '주소 삭제 완료' };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: '주소 삭제 실패' };
        }
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], AddressService);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const order_controller_1 = __webpack_require__(55);
const address_entity_1 = __webpack_require__(24);
const admin_entity_1 = __webpack_require__(11);
const cart_entity_1 = __webpack_require__(19);
const order_entity_1 = __webpack_require__(17);
const orderItem_entity_1 = __webpack_require__(21);
const product_entity_1 = __webpack_require__(15);
const product_option_entity_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(18);
const order_service_1 = __webpack_require__(57);
const user_token_entity_1 = __webpack_require__(26);
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.OrderEntity,
                address_entity_1.AddressEntity,
                user_entity_1.UserEntity,
                cart_entity_1.CartEntity,
                product_entity_1.ProductEntity,
                orderItem_entity_1.OrderItemEntity,
                admin_entity_1.AdminEntity,
                product_option_entity_1.Product_optionEntity,
                user_token_entity_1.UserTokenEntity
            ]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService],
    })
], OrderModule);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const order_dto_1 = __webpack_require__(56);
const order_service_1 = __webpack_require__(57);
const jwt_service_guard_1 = __webpack_require__(48);
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async orderList(user_id, res) {
        try {
            const result = await this.orderService.orderList(user_id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: '에러' });
        }
    }
    async orderDetail(user_id, cart_id, res) {
        try {
            const result = await this.orderService.orderDetail(user_id, cart_id);
            res.status(200).json({ data: result });
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertOrder(insertOrderDto, res) {
        try {
            if (!insertOrderDto) {
                return res
                    .status(400)
                    .json({ message: 'insertOrderDto 데이터가 필요합니다' });
            }
            const result = await this.orderService.insertOrder(insertOrderDto);
            if (result.success === true) {
                return res.status(200).json({ message: '구매가 완료되었습니다.' });
            }
            else {
                return res.status(403).json({ message: '구매에 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
            return res
                .status(403)
                .json({ message: '구매에 실패하였습니다.', error: error });
        }
    }
    async cartOrder(cartOrderDto, res) {
        try {
            const result = await this.orderService.cartOrder(cartOrderDto);
            if (result.success === true) {
                return res
                    .status(200)
                    .json({ message: '장바구니 제품들이 구매되었습니다.' });
            }
            else {
                return res
                    .status(403)
                    .json({ message: '장바구니 제품 구매에 실패하였습니다.' });
            }
        }
        catch (error) {
            console.error(error);
            return res
                .status(403)
                .json({ message: '구매에 실패하였습니다.', error: error });
        }
    }
    async refundOrder(refundOrderDto, res) {
        try {
            const result = await this.orderService.refundOrder(refundOrderDto);
            if (result.success === true) {
                res
                    .status(200)
                    .json({ message: '환불 요청이 정상적으로 완료되었습니다.' });
            }
            else {
                res.status(403).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 내역 확인 라우터' }),
    (0, common_1.Get)('/select/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 상세 내역' }),
    (0, common_1.Get)('/detail/select/:user_id/:cart_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('cart_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '제품 주문 라우터',
    }),
    (0, common_1.Post)('/insert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof order_dto_1.InsertOrderDto !== "undefined" && order_dto_1.InsertOrderDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '장바구니 제품 구매 라우터',
    }),
    (0, common_1.Post)('/cart_order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof order_dto_1.CartOrderDto !== "undefined" && order_dto_1.CartOrderDto) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cartOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고객 환불 요청 라우터' }),
    (0, common_1.Put)('/refund'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof order_dto_1.RefundOrderDto !== "undefined" && order_dto_1.RefundOrderDto) === "function" ? _h : Object, typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "refundOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [typeof (_a = typeof order_service_1.OrderService !== "undefined" && order_service_1.OrderService) === "function" ? _a : Object])
], OrderController);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefundOrderDto = exports.CartOrderDto = exports.InsertOrderDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class InsertOrderDto {
}
exports.InsertOrderDto = InsertOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버값',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 옵션 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "option_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구매 제품 수량',
        default: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 주문 현황',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        default: '주문 완료',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertOrderDto.prototype, "order_state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '환불 사유',
        required: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertOrderDto.prototype, "refund_reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 기본 배송지 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결제 방식',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 총 구매 가격',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertOrderDto.prototype, "total_price", void 0);
class CartOrderDto {
}
exports.CartOrderDto = CartOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버값',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Array)
], CartOrderDto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 상세 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "option_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구매 제품 수량',
        default: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 주문 현황',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        default: '주문 완료',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartOrderDto.prototype, "order_state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '환불 사유',
        required: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartOrderDto.prototype, "refund_reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 기본 배송지 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "address_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결제 방식',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 총 구매 가격',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartOrderDto.prototype, "total_price", void 0);
class RefundOrderDto {
}
exports.RefundOrderDto = RefundOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefundOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주문 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefundOrderDto.prototype, "order_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주문 상태',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundOrderDto.prototype, "order_state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '환불 사유',
        required: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefundOrderDto.prototype, "refund_reason", void 0);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const address_entity_1 = __webpack_require__(24);
const admin_entity_1 = __webpack_require__(11);
const cart_entity_1 = __webpack_require__(19);
const order_entity_1 = __webpack_require__(17);
const orderItem_entity_1 = __webpack_require__(21);
const product_entity_1 = __webpack_require__(15);
const product_option_entity_1 = __webpack_require__(20);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
let OrderService = class OrderService {
    constructor(orderRepository, userRepository, cartRepository, productRepository, product_optionRepository, addressRepository, orderItemsRepository, adminRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.product_optionRepository = product_optionRepository;
        this.addressRepository = addressRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.adminRepository = adminRepository;
    }
    async orderList(user_id) {
        try {
            const order = await this.orderRepository
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.address_no', 'address')
                .leftJoinAndSelect('order.orderItem', 'order_items')
                .leftJoinAndSelect('order_items.option_id', 'product_option')
                .leftJoinAndSelect('product_option.product_no', 'product')
                .select([
                'order.order_no AS order_no',
                'order.quantity AS order_quantity',
                'order.payment_method AS payment_method',
                'order.total_price AS total_price',
                'order.order_state AS order_state',
                'order.order_at AS order_at',
                'order_items.quantity AS items_qauntity',
                'order_items.unit_price AS unit_price',
                'product_option.color AS color',
                'product_option.size AS size',
                'product.product_name AS product_name',
                'product.price AS price',
                'address.name AS name',
                'address.zip_code AS zip_code',
                'address.address AS address',
            ])
                .where('order.user_id = :user_id', { user_id })
                .getRawMany();
            console.log(order);
            return order;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async orderDetail(user_id, cart_id) {
        try {
            const detail_info = await this.cartRepository.findOne({
                where: { user_id: user_id, cart_id: cart_id },
            });
            if (!detail_info) {
                throw new common_1.UnauthorizedException();
            }
            return detail_info;
        }
        catch (error) {
            console.error(error);
        }
    }
    async insertOrder(insertOrderDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: insertOrderDto.user_id },
            });
            const address = await this.addressRepository.findOne({
                where: { user_id: user.user_id, default_addr: 'Y' },
            });
            const product = await this.productRepository.findOne({
                where: { product_id: insertOrderDto.product_no },
                select: ['price'],
            });
            const product_option = await this.product_optionRepository.findOne({
                where: {
                    option_id: insertOrderDto.option_id,
                    product_no: { product_id: insertOrderDto.product_no },
                },
            });
            if (!user || !address || !product_option) {
                throw new common_1.BadRequestException('정보가 존재하지 않습니다. 다시 확인해 주세요.');
            }
            if (product_option.stock < insertOrderDto.quantity) {
                throw new common_1.BadRequestException('재고가 부족합니다. 다시 확인해 주세요.');
            }
            product_option.stock = product_option.stock - insertOrderDto.quantity;
            await this.product_optionRepository.update(product_option.option_id, {
                stock: product_option.stock,
            });
            insertOrderDto.address_no = address.address_no;
            insertOrderDto.total_price = product.price * insertOrderDto.quantity;
            const orderData = {
                ...insertOrderDto,
                product_no: [product],
            };
            const result = this.orderRepository.create(orderData);
            const saveResult = await this.orderRepository.save(result);
            const orderItems = {
                user_id: user.user_id,
                order_no: { order_no: saveResult.order_no },
                option_id: product_option,
                quantity: insertOrderDto.quantity,
                unit_price: product.price,
                total_price: insertOrderDto.total_price,
            };
            console.log(orderItems);
            const saveItems = this.orderItemsRepository.create(orderItems);
            await this.orderItemsRepository.save(saveItems);
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async cartOrder(cartOrderDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: cartOrderDto.user_id },
            });
            const address = await this.addressRepository.findOne({
                where: { user_id: user.user_id, default_addr: 'Y' },
            });
            const cart_product = await this.cartRepository
                .createQueryBuilder('cart')
                .leftJoin('product_option', 'product_option', 'product_option.option_id = cart.option_id')
                .leftJoin('product', 'product', 'product.product_id = product_option.product_no')
                .where('cart.user_id = :user_id', { user_id: cartOrderDto.user_id })
                .select(['cart', 'product_option', 'product.price'])
                .groupBy('cart.option_id')
                .getRawMany();
            const product_nos = cart_product.map((cartItem) => cartItem.cart_option_id);
            const product_data = await this.product_optionRepository.find({
                where: { option_id: (0, typeorm_2.In)(product_nos) },
            });
            if (!user || !cart_product || !product_data) {
                throw new common_1.BadRequestException('정보가 없습니다.');
            }
            let total_price = 0;
            let total_quantity = 0;
            const product_items = [];
            cart_product.forEach((cartItem) => {
                const product_option = product_data.find((product_option) => product_option.option_id === cartItem.cart_option_id);
                if (product_option) {
                    total_price += cartItem.product_price * cartItem.cart_quantity;
                    total_quantity += cartItem.cart_quantity;
                    product_items.push({
                        option_id: product_option.option_id,
                        unit_price: cartItem.cart_quantity * cartItem.product_price,
                        quantity: cartItem.cart_quantity,
                    });
                }
                console.log(cartItem);
            });
            cartOrderDto.address_no = address.address_no;
            const cartOrder_data = {
                ...cartOrderDto,
                product_no: product_data,
                quantity: total_quantity,
                total_price: total_price,
            };
            const result = this.orderRepository.create(cartOrder_data);
            const saveResult = await this.orderRepository.save(result);
            const orderItems = product_items.map((item) => ({
                ...item,
                user_id: user.user_id,
                order_no: saveResult.order_no,
                total_price: total_price,
            }));
            console.log(orderItems);
            const saveItems = this.orderItemsRepository.create(orderItems);
            await this.orderItemsRepository.save(saveItems);
            await Promise.all(cart_product.map(async (cartItem) => {
                const product_option = product_data.find((product_option) => product_option.option_id === cartItem.cart_option_id);
                if (product_option) {
                    const updateStock = product_option.stock - cartItem.cart_quantity;
                    if (updateStock < 0) {
                        throw new common_1.BadRequestException('현재 재고가 부족합니다. 다시 확인해 주세요.');
                    }
                    await this.product_optionRepository.update({ option_id: product_option.option_id }, { stock: updateStock });
                }
            }));
            await this.cartRepository.delete({ user_id: user.user_id });
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false };
        }
    }
    async refundOrder(refundOrderDto) {
        try {
            await this.checkOrderState(refundOrderDto.order_no);
            const findOrderItems = await this.orderItemsRepository.find({
                where: {
                    order_no: { order_no: refundOrderDto.order_no },
                },
                relations: ['product_no'],
            });
            refundOrderDto.order_state = '환불 진행 중';
            const result = await this.orderRepository.save(refundOrderDto);
            Promise.all(findOrderItems.map(async (item) => {
                const product = item.option_id;
                const order_quantity = item.quantity;
                await this.productRepository.save(product);
            }));
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    async checkOrderState(order_no) {
        try {
            const orderState = await this.orderRepository.findOne({
                where: { order_no: order_no },
                select: ['order_state'],
            });
            if (orderState.order_state === '환불 진행 중' ||
                orderState.order_state === '환불 완료') {
                throw new common_1.BadRequestException('이미 환불 처리된 주문입니다.');
            }
            else {
                return;
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(product_option_entity_1.Product_optionEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(address_entity_1.AddressEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItemEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _g : Object, typeof (_h = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _h : Object])
], OrderService);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const review_controller_1 = __webpack_require__(59);
const order_entity_1 = __webpack_require__(17);
const orderItem_entity_1 = __webpack_require__(21);
const product_entity_1 = __webpack_require__(15);
const review_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(18);
const review_service_1 = __webpack_require__(61);
const user_token_entity_1 = __webpack_require__(26);
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                review_entity_1.ReviewEntity,
                product_entity_1.ProductEntity,
                user_entity_1.UserEntity,
                order_entity_1.OrderEntity,
                orderItem_entity_1.OrderItemEntity,
                user_token_entity_1.UserTokenEntity
            ]),
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
    })
], ReviewModule);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const public_decorator_1 = __webpack_require__(35);
const review_dto_1 = __webpack_require__(60);
const review_service_1 = __webpack_require__(61);
const jwt_service_guard_1 = __webpack_require__(48);
let ReviewController = class ReviewController {
    constructor(reviewSerview) {
        this.reviewSerview = reviewSerview;
    }
    async insertReview(insertReviewDto, res) {
        try {
            const checkResult = await this.reviewSerview.checkOrder(insertReviewDto.user_id);
            if (checkResult.check === true) {
                const result = await this.reviewSerview.insertReview(insertReviewDto);
                if (result.success === true) {
                    res.status(200).json({ message: '리뷰 작성에 성공하였습니다.' });
                }
                else {
                    res.status(403).json({ message: result.message, result: result });
                }
            }
            else {
                res.status(403).json({ message: checkResult.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectReview(product_no, res) {
        try {
            const result = await this.reviewSerview.selectReview(product_no);
            console.log(result);
            res.status(200).json({ result });
        }
        catch (error) {
            console.error(error);
        }
    }
    async myReview(user_id, res) {
        try {
            const result = await this.reviewSerview.myReview(user_id);
            res.status(200).json({ result });
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 리뷰 작성 라우터' }),
    (0, common_1.Post)('/insert_review'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof review_dto_1.InsertReviewDto !== "undefined" && review_dto_1.InsertReviewDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "insertReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 내역 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_review/:product_no'),
    __param(0, (0, common_1.Param)('product_no')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "selectReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자가 작성한 리뷰 확인 라우터' }),
    (0, common_1.Get)('/myReview/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "myReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [typeof (_a = typeof review_service_1.ReviewService !== "undefined" && review_service_1.ReviewService) === "function" ? _a : Object])
], ReviewController);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsertReviewDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class InsertReviewDto {
}
exports.InsertReviewDto = InsertReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertReviewDto.prototype, "order_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 번호',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertReviewDto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 세부 넘버',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertReviewDto.prototype, "option_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertReviewDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리뷰 내용',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], InsertReviewDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '별점 (예: 3.5, 4.5, ...)',
        example: 4.5,
        type: Number,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertReviewDto.prototype, "scope", void 0);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const order_entity_1 = __webpack_require__(17);
const orderItem_entity_1 = __webpack_require__(21);
const product_entity_1 = __webpack_require__(15);
const review_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
let ReviewService = class ReviewService {
    constructor(userRepository, productRepository, orderRepository, orderItemRepository, reviewRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.reviewRepository = reviewRepository;
    }
    async selectReview(product_no) {
        try {
            const product_reviews = await this.reviewRepository
                .createQueryBuilder('review')
                .leftJoin((qb) => qb
                .select('helpful_review.review_no', 'review_no')
                .addSelect('COUNT(helpful_review.review_no)', 'helpful_count')
                .from('helpful_review', 'helpful_review')
                .groupBy('helpful_review.review_no'), 'helpful_count', 'review.review_no = helpful_count.review_no')
                .where('review.product_no = :product_no', { product_no })
                .select([
                'review.*',
                'IFNULL(helpful_count.helpful_count, 0) as helpful_count',
            ])
                .orderBy('review.write_at', 'DESC')
                .getRawMany();
            if (!product_reviews) {
                return null;
            }
            return product_reviews;
        }
        catch (error) {
            console.error(error);
        }
    }
    async myReview(user_id) {
        try {
            const review = await this.reviewRepository.find({
                where: { user_id: user_id },
                relations: ['option_id']
            });
            if (!review) {
                return null;
            }
            return review;
        }
        catch (error) {
            console.error(error);
        }
    }
    async checkOrder(user_id) {
        try {
            const checkOrderState = await this.orderRepository.find({
                where: { user_id: user_id, order_state: '배송 완료' },
            });
            if (checkOrderState.length === 0) {
                throw new common_1.BadRequestException('리뷰 작성이 가능한 제품이 없습니다.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async insertReview(insertReviewDto) {
        try {
            const result = await this.findItemReview(insertReviewDto.order_no, insertReviewDto.option_id, insertReviewDto.user_id);
            console.log('result : ', result);
            if (result.check === true) {
                const writeReview = this.reviewRepository.create(insertReviewDto);
                const saveReview = await this.reviewRepository.save(writeReview);
                await this.orderItemRepository.update(result.result, {
                    review_status: true,
                });
                if (!saveReview) {
                    throw new common_1.BadRequestException('리뷰 작성에 실패하였습니다. 다시 시도해 주세요.');
                }
            }
            else {
                return { message: result.message };
            }
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    async findItemReview(order_no, option_id, user_id) {
        try {
            const findItem = await this.orderItemRepository
                .createQueryBuilder('orderItems')
                .leftJoin('orderItems.order_no', 'order')
                .leftJoin('orderItems.option_id', 'product_option')
                .select([
                'orderItems.orderItem_no AS orderItem_no',
                'orderItems.review_status AS review_status',
                'order.order_no AS order_no',
                'product_option.option_id AS option_id'
            ])
                .where('orderItems.user_id = :user_id', { user_id: user_id })
                .andWhere('orderItems.order_no = :order_no', { order_no: order_no })
                .andWhere('orderItems.option_id = :option_id', { option_id: option_id })
                .getRawOne();
            if (!findItem) {
                throw new common_1.BadRequestException('구매 내역에 존재하지 않는 제품입니다.');
            }
            if (findItem.review_status === 1) {
                throw new common_1.BadRequestException('이미 리뷰를 작성한 제품입니다.');
            }
            return { check: true, result: findItem };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItemEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], ReviewService);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnAModoule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const qna_controller_1 = __webpack_require__(63);
const product_entity_1 = __webpack_require__(15);
const qna_entity_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(18);
const qna_service_1 = __webpack_require__(65);
const user_token_entity_1 = __webpack_require__(26);
let QnAModoule = class QnAModoule {
};
exports.QnAModoule = QnAModoule;
exports.QnAModoule = QnAModoule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, product_entity_1.ProductEntity, qna_entity_1.QnAEntity, user_token_entity_1.UserTokenEntity])],
        controllers: [qna_controller_1.QnAController],
        providers: [qna_service_1.QnAService],
    })
], QnAModoule);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnAController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const qna_dto_1 = __webpack_require__(64);
const qna_service_1 = __webpack_require__(65);
const jwt_service_guard_1 = __webpack_require__(48);
const public_decorator_1 = __webpack_require__(35);
let QnAController = class QnAController {
    constructor(qnaService) {
        this.qnaService = qnaService;
    }
    async insertQnA(insertQnADto, res) {
        try {
            const result = await this.qnaService.insertQnA(insertQnADto);
            if (result.success === true) {
                res.status(200).json({ message: 'Q&A 작성이 완료되었습니다.' });
            }
            else {
                res.status(403).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectQnA(product_no, res) {
        try {
            const result = await this.qnaService.selectAllQnATitle(product_no);
            res.status(200).json({ data: result.data });
        }
        catch (error) {
            console.error(error);
        }
    }
    async myQnA(user_id, res) {
        try {
            const result = await this.qnaService.myQnA(user_id);
            res.status(200).json({ result });
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.QnAController = QnAController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 Q&A 작성 라운터' }),
    (0, common_1.Post)('/insert_qna'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof qna_dto_1.InsertQnADto !== "undefined" && qna_dto_1.InsertQnADto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "insertQnA", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Q&A 목록 라우터 (없을 경우에는 null)' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/select_qna/:product_no'),
    __param(0, (0, common_1.Param)('product_no')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "selectQnA", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자가 작성한 QnA 확인 라우터' }),
    (0, common_1.Get)('/myQnA/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "myQnA", null);
exports.QnAController = QnAController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('QnA'),
    __metadata("design:paramtypes", [typeof (_a = typeof qna_service_1.QnAService !== "undefined" && qna_service_1.QnAService) === "function" ? _a : Object])
], QnAController);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsertQnADto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
const product_entity_1 = __webpack_require__(15);
const product_option_entity_1 = __webpack_require__(20);
class InsertQnADto {
}
exports.InsertQnADto = InsertQnADto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 넘버',
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", typeof (_a = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _a : Object)
], InsertQnADto.prototype, "product_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 상세 넘버',
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", typeof (_b = typeof product_option_entity_1.Product_optionEntity !== "undefined" && product_option_entity_1.Product_optionEntity) === "function" ? _b : Object)
], InsertQnADto.prototype, "option_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 고유 넘버',
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InsertQnADto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제목',
        type: 'string',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, { message: '제목은 5자 이상, 20자 이하로 입력해 주세요.' }),
    (0, class_validator_1.MinLength)(5, { message: '제목은 5자 이상, 20자 이하로 입력해 주세요.' }),
    __metadata("design:type", String)
], InsertQnADto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '질문 내용',
        type: 'string',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], InsertQnADto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀글 적용 여부',
        type: 'boolean',
        nullable: false,
        default: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], InsertQnADto.prototype, "private", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀글 확인 비밀번호',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsertQnADto.prototype, "private_pwd", void 0);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnAService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const product_entity_1 = __webpack_require__(15);
const qna_entity_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
const bcrypt = __webpack_require__(34);
let QnAService = class QnAService {
    constructor(userRepository, productRepository, qnaRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.qnaRepository = qnaRepository;
    }
    async insertQnA(insertQnADto) {
        try {
            if (insertQnADto.private === true && !insertQnADto.private_pwd) {
                throw new common_1.BadRequestException('비밀글을 작성하기 위해서는 비밀번호를 등록해야 합니다.');
            }
            if (insertQnADto.private === true) {
                const hashPassword = await this.hashPrivatePwd(insertQnADto.private_pwd);
                insertQnADto.private_pwd = hashPassword;
            }
            const writeQnA = this.qnaRepository.create(insertQnADto);
            await this.qnaRepository.save(writeQnA);
            return { success: true };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async hashPrivatePwd(private_pwd) {
        try {
            const hashPwd = await bcrypt.hash(private_pwd, 10);
            return hashPwd;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async selectAllQnATitle(product_no) {
        try {
            const allQna = await this.qnaRepository
                .createQueryBuilder('qna')
                .leftJoinAndSelect('qna.product_no', 'product')
                .leftJoinAndSelect('qna.option_id', 'product_option')
                .select([
                'qna.title AS title',
                'qna.content AS content',
                'qna.private AS private',
                'qna.answer_yn AS answer_yn',
                'product.product_id AS product_id',
                'product.product_name AS product_name',
                'product_option.option_id AS option_id',
                'product_option.color AS color',
                'product_option.size AS size'
            ])
                .where('qna.product_no = :product_no', { product_no })
                .getRawMany();
            const qnaData = allQna.map((item) => ({
                ...item,
                title: item.private === 1 ? (item.title = '비밀글 입니다.') : item.title,
                answer_yn: item.answer_yn === 1 ? '답변 완료' : '답변 대기 중',
            }));
            if (!qnaData) {
                return null;
            }
            return { data: qnaData };
        }
        catch (error) {
            console.error(error);
        }
    }
    async myQnA(user_id) {
        try {
            const myQnA = await this.qnaRepository
                .createQueryBuilder('qna')
                .leftJoinAndSelect('qna.product_no', 'product')
                .leftJoinAndSelect('qna.option_id', 'product_option')
                .leftJoinAndSelect('qna.user_id', 'user')
                .select([
                'qna.qna_no AS qna_no',
                'qna.title AS title',
                'qna.content AS content',
                'qna.write_at AS write_at',
                'product.product_name AS product_name',
                'product_option.color AS color',
                'product_option.size AS size',
                'user.name AS name',
                'user.email AS email',
            ])
                .where('qna.user_id = :user_id', { user_id })
                .getRawMany();
            if (!myQnA) {
                return null;
            }
            return myQnA;
        }
        catch (error) {
            console.error(error);
        }
    }
    async selectQnA(user_id, qna_no, pwd) {
        try {
            const selectQnA = await this.qnaRepository.findOne({
                where: { user_id: user_id, qna_no: qna_no },
                select: ['private']
            });
            if (!selectQnA) {
                throw new common_1.BadRequestException('존재하지 않는 QnA입니다.');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.QnAService = QnAService;
exports.QnAService = QnAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(qna_entity_1.QnAEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], QnAService);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnA_AnswerModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const qna_answer_entity_1 = __webpack_require__(13);
const qna_answer_service_1 = __webpack_require__(67);
const admin_entity_1 = __webpack_require__(11);
const qna_answer_controller_1 = __webpack_require__(68);
const qna_entity_1 = __webpack_require__(14);
let QnA_AnswerModule = class QnA_AnswerModule {
};
exports.QnA_AnswerModule = QnA_AnswerModule;
exports.QnA_AnswerModule = QnA_AnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, qna_answer_entity_1.QnA_AnswerEntity, qna_entity_1.QnAEntity]),
        ],
        controllers: [qna_answer_controller_1.QnA_AdminController],
        providers: [qna_answer_service_1.QnA_AnswerService],
    })
], QnA_AnswerModule);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnA_AnswerService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const admin_entity_1 = __webpack_require__(11);
const qna_entity_1 = __webpack_require__(14);
const qna_answer_entity_1 = __webpack_require__(13);
const typeorm_2 = __webpack_require__(12);
let QnA_AnswerService = class QnA_AnswerService {
    constructor(admin, qna_answer, qna) {
        this.admin = admin;
        this.qna_answer = qna_answer;
        this.qna = qna;
    }
    async all_qna() {
        try {
            const qna_list = await this.qna.find({ relations: ['product_no'] });
            console.log(qna_list);
            const qna_answer_yn = qna_list.map((item) => ({
                ...item,
                answer_yn: item.answer_yn === true ? '답변 완료' : '답변 대기 중',
            }));
            return qna_answer_yn;
        }
        catch (error) {
            console.error(error);
        }
    }
    async select_qna(qna_no) {
        try {
            const qna = await this.qna.findOne({ where: { qna_no: qna_no } });
            if (!qna) {
                throw new common_1.BadRequestException('존재하지 않는 게시글입니다. 다시 확인해 주세요.');
            }
            return { success: true, result: qna };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async checkAdmin(admin_no) {
        try {
            const findAdmin = await this.admin.findOne({
                where: { admin_id: admin_no },
            });
            if (!findAdmin) {
                throw new common_1.BadRequestException('존재하지 않는 관리자입니다. 다시 확인해 주세요.');
            }
            if (findAdmin.role !== 'admin') {
                throw new common_1.BadRequestException('답변 권한이 없는 관리자 계정입니다.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async admin_qna_answer(qna_answerDto) {
        try {
            const answer = await this.qna_answer.create(qna_answerDto);
            const saveAnswer = await this.qna_answer.save(answer);
            if (saveAnswer) {
                await this.qna.update(qna_answerDto.qna_no, { answer_yn: true });
            }
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
};
exports.QnA_AnswerService = QnA_AnswerService;
exports.QnA_AnswerService = QnA_AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(qna_answer_entity_1.QnA_AnswerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(qna_entity_1.QnAEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], QnA_AnswerService);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnA_AdminController = void 0;
const common_1 = __webpack_require__(6);
const qna_answer_service_1 = __webpack_require__(67);
const express_1 = __webpack_require__(30);
const qna_answer_dto_1 = __webpack_require__(69);
const public_decorator_1 = __webpack_require__(35);
let QnA_AdminController = class QnA_AdminController {
    constructor(qna_answerService) {
        this.qna_answerService = qna_answerService;
    }
    async all_qna(res) {
        try {
            const result = await this.qna_answerService.all_qna();
            res.status(200).json({ data: result });
        }
        catch (error) {
            console.error(error);
        }
    }
    async select_qna(qna_no, res) {
        try {
            const result = await this.qna_answerService.select_qna(qna_no);
            if (result.success === true) {
                res.status(200).json({ data: result.result });
            }
            else {
                res.status(403).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async qna_answer(qna_answerDto, res) {
        try {
            const check_admin = await this.qna_answerService.checkAdmin(qna_answerDto.admin_no);
            console.log(check_admin);
            if (check_admin.check === true) {
                const result = await this.qna_answerService.admin_qna_answer(qna_answerDto);
                if (result.success === true) {
                    res.status(200).json({ message: '답변이 등록되었습니다!' });
                }
                else {
                    res
                        .status(403)
                        .json({ message: '답변 등록에 실패했습니다. 다시 확인해 주세요.' });
                }
            }
            else {
                res.status(403).json({ message: check_admin.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.QnA_AdminController = QnA_AdminController;
__decorate([
    (0, common_1.Get)('/all_qna'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], QnA_AdminController.prototype, "all_qna", null);
__decorate([
    (0, common_1.Get)('/select_qna'),
    __param(0, (0, common_1.Query)('qna_no')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], QnA_AdminController.prototype, "select_qna", null);
__decorate([
    (0, common_1.Post)('/qna_answer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof qna_answer_dto_1.QnA_AnswerDto !== "undefined" && qna_answer_dto_1.QnA_AnswerDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], QnA_AdminController.prototype, "qna_answer", null);
exports.QnA_AdminController = QnA_AdminController = __decorate([
    (0, common_1.Controller)('admin/qna'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [typeof (_a = typeof qna_answer_service_1.QnA_AnswerService !== "undefined" && qna_answer_service_1.QnA_AnswerService) === "function" ? _a : Object])
], QnA_AdminController);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QnA_AnswerDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class QnA_AnswerDto {
}
exports.QnA_AnswerDto = QnA_AnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리자 고유 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QnA_AnswerDto.prototype, "admin_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '질문 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QnA_AnswerDto.prototype, "qna_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '답변 내용' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], QnA_AnswerDto.prototype, "contents", void 0);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMngModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const admin_entity_1 = __webpack_require__(11);
const order_entity_1 = __webpack_require__(17);
const order_mng_controller_1 = __webpack_require__(71);
const order_mng_service_1 = __webpack_require__(72);
let OrderMngModule = class OrderMngModule {
};
exports.OrderMngModule = OrderMngModule;
exports.OrderMngModule = OrderMngModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, order_entity_1.OrderEntity])],
        controllers: [order_mng_controller_1.OrderMngController],
        providers: [order_mng_service_1.OrderMngService],
    })
], OrderMngModule);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMngController = void 0;
const common_1 = __webpack_require__(6);
const order_mng_service_1 = __webpack_require__(72);
const swagger_1 = __webpack_require__(29);
const order_mng_dto_1 = __webpack_require__(73);
const express_1 = __webpack_require__(30);
const public_decorator_1 = __webpack_require__(35);
let OrderMngController = class OrderMngController {
    constructor(orderMngService) {
        this.orderMngService = orderMngService;
    }
    async successRefund(orderMngDto, res) {
        try {
            const checkAdmin = await this.orderMngService.checkAdmin(orderMngDto.admin_id);
            if (checkAdmin.check === true) {
                const result = await this.orderMngService.orderMng(orderMngDto);
                if (result.success === true) {
                    res.status(200).json({ message: '주문 상태가 변경되었습니다.' });
                }
                else {
                    res.status(403).json({ message: result.message });
                }
            }
            else {
                res.status(403).json({ message: checkAdmin.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.OrderMngController = OrderMngController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '관리자 주문 상태 관리 라우터' }),
    (0, common_1.Put)('/update_order_state'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof order_mng_dto_1.OrderMngDto !== "undefined" && order_mng_dto_1.OrderMngDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], OrderMngController.prototype, "successRefund", null);
exports.OrderMngController = OrderMngController = __decorate([
    (0, common_1.Controller)('admin/order_mng'),
    (0, public_decorator_1.Public)(),
    __metadata("design:paramtypes", [typeof (_a = typeof order_mng_service_1.OrderMngService !== "undefined" && order_mng_service_1.OrderMngService) === "function" ? _a : Object])
], OrderMngController);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMngService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const admin_entity_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const order_entity_1 = __webpack_require__(17);
let OrderMngService = class OrderMngService {
    constructor(admin, orderRepository) {
        this.admin = admin;
        this.orderRepository = orderRepository;
    }
    async checkAdmin(admin_id) {
        try {
            const findAdmin = await this.admin.findOne({
                where: { admin_id: admin_id },
            });
            if (!findAdmin) {
                throw new common_1.BadRequestException('존재하지 않는 관리자입니다. 다시 확인해 주세요.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async orderMng(orderMngDto) {
        try {
            const findOrderState = await this.orderRepository.findOne({
                where: {
                    order_no: orderMngDto.order_no,
                },
            });
            if (!findOrderState) {
                throw new common_1.BadRequestException('존재하지 않는 주문 번호입니다. 다시 확인해 주세요.');
            }
            if (findOrderState.order_state === '환불 완료') {
                throw new common_1.BadRequestException('이미 환불이 완료된 주문입니다. 다시 확인해 주세요.');
            }
            switch (orderMngDto.order_state) {
                case (orderMngDto.order_state = '배송 중'):
                    if (findOrderState.order_state !== '주문 완료') {
                        throw new common_1.BadRequestException('주문이 완료된 상태에서만 변경이 가능합니다. 다시 확인해 주세요.');
                    }
                    break;
                case (orderMngDto.order_state = '배송 완료'):
                    if (findOrderState.order_state !== '배송 중') {
                        throw new common_1.BadRequestException('배송 중인 상태에서만 변경이 가능합니다. 다시 확인해 주세요.');
                    }
                    break;
                case (orderMngDto.order_state = '환불 완료'):
                    if (findOrderState.order_state !== '환불 진행 중') {
                        throw new common_1.BadRequestException('환불 진행 중인 상태의 주문만 변경이 가능합니다. 다시 확인해 주세요.');
                    }
                    break;
                default:
                    throw new common_1.BadRequestException('유효하지 않은 주문 상태입니다. 다시 확인해 주세요.');
            }
            await this.orderRepository.update(orderMngDto.order_no, {
                order_state: orderMngDto.order_state,
            });
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
};
exports.OrderMngService = OrderMngService;
exports.OrderMngService = OrderMngService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], OrderMngService);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMngDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class OrderMngDto {
}
exports.OrderMngDto = OrderMngDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리자 아이디' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderMngDto.prototype, "admin_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 주문 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderMngDto.prototype, "order_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 주문 상태' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderMngDto.prototype, "order_state", void 0);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Like_ProductModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const like_product_controller_1 = __webpack_require__(75);
const like_product_entity_1 = __webpack_require__(25);
const product_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(18);
const like_product_service_1 = __webpack_require__(77);
const user_token_entity_1 = __webpack_require__(26);
let Like_ProductModule = class Like_ProductModule {
};
exports.Like_ProductModule = Like_ProductModule;
exports.Like_ProductModule = Like_ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([like_product_entity_1.Like_ProductEntity, user_entity_1.UserEntity, product_entity_1.ProductEntity, user_token_entity_1.UserTokenEntity]),
        ],
        controllers: [like_product_controller_1.Like_ProductController],
        providers: [like_product_service_1.Like_ProductService],
    })
], Like_ProductModule);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Like_ProductController = void 0;
const common_1 = __webpack_require__(6);
const express_1 = __webpack_require__(30);
const like_product_dto_1 = __webpack_require__(76);
const like_product_service_1 = __webpack_require__(77);
const jwt_service_guard_1 = __webpack_require__(48);
let Like_ProductController = class Like_ProductController {
    constructor(like_productService) {
        this.like_productService = like_productService;
    }
    async press_liked(press_likedDto, res) {
        try {
            const checkData = await this.like_productService.checkData(press_likedDto);
            if (checkData.check === true) {
                const result = await this.like_productService.press_liked(press_likedDto);
                if (result.success === true) {
                    res.status(200).json({ message: result.message });
                }
                else {
                    res.status(403).json({ message: result.message });
                }
            }
            else {
                res.status(403).json({ message: checkData.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.Like_ProductController = Like_ProductController;
__decorate([
    (0, common_1.Post)('/press_liked'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof like_product_dto_1.Press_likedDto !== "undefined" && like_product_dto_1.Press_likedDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], Like_ProductController.prototype, "press_liked", null);
exports.Like_ProductController = Like_ProductController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('like_product'),
    __metadata("design:paramtypes", [typeof (_a = typeof like_product_service_1.Like_ProductService !== "undefined" && like_product_service_1.Like_ProductService) === "function" ? _a : Object])
], Like_ProductController);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Press_likedDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class Press_likedDto {
}
exports.Press_likedDto = Press_likedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '유저 고유 넘버' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Press_likedDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 번호' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Press_likedDto.prototype, "product_no", void 0);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Like_ProductService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const like_product_entity_1 = __webpack_require__(25);
const product_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
let Like_ProductService = class Like_ProductService {
    constructor(user, product, like_product) {
        this.user = user;
        this.product = product;
        this.like_product = like_product;
    }
    async checkData(press_likedDto) {
        try {
            const findUser = await this.user.findOne({
                where: { user_id: press_likedDto.user_id },
            });
            const findProduct = await this.product.findOne({
                where: { product_id: press_likedDto.product_no },
            });
            if (!findUser) {
                throw new common_1.BadRequestException('존재하지 않는 유저입니다.');
            }
            if (!findProduct) {
                throw new common_1.BadRequestException('존재하지 않는 제품입니다.');
            }
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async press_liked(press_likedDto) {
        try {
            const findLikedUser = await this.like_product.findOne({
                where: {
                    user_id: press_likedDto.user_id,
                    product_no: press_likedDto.product_no,
                },
            });
            if (findLikedUser) {
                await this.like_product.delete(press_likedDto);
                return { success: true, message: '좋아요가 취소되었습니다.' };
            }
            const liked = await this.like_product.create(press_likedDto);
            const saveLiked = await this.like_product.save(liked);
            return { success: true, message: '좋아요가 등록되었습니다' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.Like_ProductService = Like_ProductService;
exports.Like_ProductService = Like_ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(like_product_entity_1.Like_ProductEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], Like_ProductService);


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helpful_ReviewModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const helpful_review_controller_1 = __webpack_require__(79);
const helpful_review_entity_1 = __webpack_require__(23);
const product_entity_1 = __webpack_require__(15);
const review_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(18);
const helpul_review_service_1 = __webpack_require__(81);
const user_token_entity_1 = __webpack_require__(26);
let Helpful_ReviewModule = class Helpful_ReviewModule {
};
exports.Helpful_ReviewModule = Helpful_ReviewModule;
exports.Helpful_ReviewModule = Helpful_ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                product_entity_1.ProductEntity,
                review_entity_1.ReviewEntity,
                helpful_review_entity_1.Helpful_ReviewEntity,
                user_token_entity_1.UserTokenEntity
            ]),
        ],
        controllers: [helpful_review_controller_1.Helpful_ReviewController],
        providers: [helpul_review_service_1.Helpful_ReviewServiece],
    })
], Helpful_ReviewModule);


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helpful_ReviewController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const helpful_review_dto_1 = __webpack_require__(80);
const helpul_review_service_1 = __webpack_require__(81);
const jwt_service_guard_1 = __webpack_require__(48);
let Helpful_ReviewController = class Helpful_ReviewController {
    constructor(helpful_reviewSerview) {
        this.helpful_reviewSerview = helpful_reviewSerview;
    }
    async press_review(press_helpful_reviewDto, res) {
        try {
            const checkData = await this.helpful_reviewSerview.checkData(press_helpful_reviewDto);
            if (checkData.check === true) {
                const result = await this.helpful_reviewSerview.press_helpful_review(press_helpful_reviewDto);
                if (result.success === true) {
                    res.status(200).json({ message: result.message });
                }
                else {
                    res.status(403).json({ message: result.message });
                }
            }
            else {
                res.status(403).json({ message: checkData.message });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.Helpful_ReviewController = Helpful_ReviewController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 도움되었어요. 버튼 클릭 시 상태 라우터' }),
    (0, common_1.Post)('/press_review'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof helpful_review_dto_1.Press_helpful_reviewDto !== "undefined" && helpful_review_dto_1.Press_helpful_reviewDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], Helpful_ReviewController.prototype, "press_review", null);
exports.Helpful_ReviewController = Helpful_ReviewController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('helpful_review'),
    __metadata("design:paramtypes", [typeof (_a = typeof helpul_review_service_1.Helpful_ReviewServiece !== "undefined" && helpul_review_service_1.Helpful_ReviewServiece) === "function" ? _a : Object])
], Helpful_ReviewController);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Press_helpful_reviewDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class Press_helpful_reviewDto {
}
exports.Press_helpful_reviewDto = Press_helpful_reviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '리뷰 넘버' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Press_helpful_reviewDto.prototype, "review_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 고유 넘버' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Press_helpful_reviewDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 고유 넘버' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Press_helpful_reviewDto.prototype, "product_no", void 0);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helpful_ReviewServiece = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const helpful_review_entity_1 = __webpack_require__(23);
const product_entity_1 = __webpack_require__(15);
const review_entity_1 = __webpack_require__(22);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
let Helpful_ReviewServiece = class Helpful_ReviewServiece {
    constructor(user, product, review, helpful_review) {
        this.user = user;
        this.product = product;
        this.review = review;
        this.helpful_review = helpful_review;
    }
    async checkData(press_helpful_reviewDto) {
        try {
            await this.checkUser(press_helpful_reviewDto.user_id);
            await this.checkProduct(press_helpful_reviewDto.product_no);
            await this.checkReview(press_helpful_reviewDto.review_no);
            return { check: true };
        }
        catch (error) {
            return { check: false, message: error.message };
        }
    }
    async checkUser(user_id) {
        const findUser = await this.user.findOne({ where: { user_id: user_id } });
        if (!findUser) {
            throw new common_1.BadRequestException('존재하지 않는 유저입니다.');
        }
    }
    async checkProduct(product_no) {
        const findProduct = await this.product.findOne({
            where: { product_id: product_no },
        });
        if (!findProduct) {
            throw new common_1.BadRequestException('존재하지 않는 제품입니다.');
        }
    }
    async checkReview(review_no) {
        const findReview = await this.review.findOne({
            where: { review_no: review_no },
        });
        if (!findReview) {
            throw new common_1.BadRequestException('존재하지 않는 리뷰입니다.');
        }
    }
    async press_helpful_review(press_helpful_reviewDto) {
        try {
            const press_yn = await this.helpful_review.findOne({
                where: {
                    review_no: press_helpful_reviewDto.review_no,
                    user_id: press_helpful_reviewDto.user_id,
                    product_no: press_helpful_reviewDto.product_no,
                },
            });
            if (!press_yn) {
                const create_press = await this.helpful_review.create(press_helpful_reviewDto);
                await this.helpful_review.save(create_press);
                return {
                    success: true,
                    message: '도움 되었어요 버튼을 활성화 합니다.',
                };
            }
            await this.helpful_review.remove(press_yn);
            return { success: true, message: '도움 되었어요 버튼을 취소합니다.' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.Helpful_ReviewServiece = Helpful_ReviewServiece;
exports.Helpful_ReviewServiece = Helpful_ReviewServiece = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(helpful_review_entity_1.Helpful_ReviewEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], Helpful_ReviewServiece);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const user_controller_1 = __webpack_require__(83);
const user_entity_1 = __webpack_require__(18);
const user_token_entity_1 = __webpack_require__(26);
const user_service_1 = __webpack_require__(87);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_token_entity_1.UserTokenEntity]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(29);
const express_1 = __webpack_require__(30);
const public_decorator_1 = __webpack_require__(35);
const jwt_service_guard_1 = __webpack_require__(48);
const auth_dto_1 = __webpack_require__(84);
const user_dto_1 = __webpack_require__(85);
const auth_service_1 = __webpack_require__(86);
const user_service_1 = __webpack_require__(87);
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async duplicateUser(body, res) {
        try {
            const result = await this.userService.checkDuplicate(body?.email, body?.phone);
            res.status(200).json(result);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async signup(signupUserDto, res) {
        try {
            const hashPassword = await this.userService.hashPassword(signupUserDto.password);
            signupUserDto.password = hashPassword;
            const result = await this.userService.signupUser(signupUserDto);
            console.log(result);
            res
                .status(result.success ? 201 : 400)
                .json({ message: result.message, data: result.data });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: '서버에러입니다.' });
        }
    }
    async login(loginDto, req, res) {
        try {
            const deviceId = req.headers['device-id'];
            if (Array.isArray(deviceId)) {
                loginDto.device_id = deviceId[0];
            }
            else {
                loginDto.device_id = deviceId;
            }
            const token = await this.authService.login(loginDto);
            res.cookie('shop_access_token', token.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });
            res.cookie('shop_refresh_token', token.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });
            res
                .status(common_1.HttpStatus.OK)
                .json({ message: '로그인 성공', data: token });
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
    async getProfile(req) {
        try {
            console.log(req.user);
            return {
                user_id: req.user.user_id,
                email: req.user.email,
                name: req.user.name,
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    async logout(res, logoutDto, req) {
        const deviceId = req.headers['device-id'];
        if (Array.isArray(deviceId)) {
            logoutDto.device_id = deviceId[0];
        }
        else {
            logoutDto.device_id = deviceId;
        }
        await this.authService.logout(logoutDto);
        res.clearCookie('shop_access_token');
        res.clearCookie('shop_refresh_token');
        res.status(200).send();
        return { message: '로그아웃' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입 중복 검사 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/duplicate_user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "duplicateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.SignUpUserDto !== "undefined" && user_dto_1.SignUpUserDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _f : Object, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인 상태 유지를 위한 인증 라우터' }),
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃 라우터' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, typeof (_k = typeof auth_dto_1.LogoutDto !== "undefined" && auth_dto_1.LogoutDto) === "function" ? _k : Object, typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(jwt_service_guard_1.JwtServiceAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], UserController);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutDto = exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(32);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "device_id", void 0);
class LogoutDto {
}
exports.LogoutDto = LogoutDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogoutDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogoutDto.prototype, "device_id", void 0);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpUserDto = void 0;
const swagger_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(32);
class SignUpUserDto {
}
exports.SignUpUserDto = SignUpUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '홍길동',
        description: '사용자 이름',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '01012341234',
        description: '사용자 휴대폰 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)('KR'),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@maver.com',
        description: '유저 계정',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user123',
        description: '유저 비밀번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "password", void 0);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(10);
const jwt_1 = __webpack_require__(49);
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
const bcrypt = __webpack_require__(34);
const user_token_entity_1 = __webpack_require__(26);
let AuthService = class AuthService {
    constructor(user, user_token, jwtService, configService) {
        this.user = user;
        this.user_token = user_token;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginDto) {
        const caluateExpriryDate = () => {
            const now = new Date();
            now.setDate(now.getDate() + 7);
            return now;
        };
        const user = await this.vaildateServiceUser(loginDto);
        const accessToken = await this.accessTokenService(user);
        const refreshToken = await this.refreshTokenService(user);
        const user_info = {
            email: user.email,
            name: user.name,
        };
        const findToken = await this.user_token.findOne({
            where: { user_id: user.user_id, token: refreshToken },
        });
        if (!findToken) {
            const newToken = this.user_token.create({
                user_id: user.user_id,
                token: refreshToken,
                device_id: loginDto.device_id,
                expires_at: caluateExpriryDate(),
            });
            await this.user_token.save(newToken);
        }
        return { accessToken, refreshToken, user_info };
    }
    async vaildateServiceUser(loginDto) {
        try {
            const findUser = await this.user.findOne({
                where: { email: loginDto.email },
            });
            if (!findUser) {
                throw new common_1.ForbiddenException('가입되지 않은 유저입니다.');
            }
            if (!(await bcrypt.compare(loginDto.password, findUser.password))) {
                throw new common_1.ForbiddenException('비밀번호가 일치하지 않습니다.');
            }
            return findUser;
        }
        catch (error) {
            console.error(error);
        }
    }
    async accessTokenService(user) {
        const payload = {
            user_id: user.user_id,
            email: user.email,
            name: user.name,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1h',
        });
        return accessToken;
    }
    async refreshTokenService(user) {
        const payload = {
            user_id: user.user_id,
            email: user.email,
            name: user.name,
        };
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7h',
        });
        return refreshToken;
    }
    async logout(logoutDto) {
        try {
            const user = await this.user.findOne({
                where: { email: logoutDto.email },
                select: ['user_id'],
            });
            await this.user_token.delete({
                user_id: user.user_id,
                device_id: logoutDto.device_id,
            });
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_token_entity_1.UserTokenEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], AuthService);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(12);
const bcrypt = __webpack_require__(34);
let UserService = class UserService {
    constructor(user) {
        this.user = user;
    }
    async checkDuplicate(email, phone) {
        try {
            const result = {};
            if (email) {
                const emailResult = await this.checkEmail(email);
                result.email = emailResult.message || emailResult.ErrorMessage;
            }
            if (phone) {
                const phoneResult = await this.checkPhone(phone);
                result.phone = phoneResult.message || phoneResult.ErrorMessage;
            }
            return result;
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async checkEmail(email) {
        try {
            const dupEmail = await this.user.findOne({ where: { email: email } });
            if (dupEmail) {
                throw new common_1.BadRequestException('이미 사용 중인 이메일 입니다.');
            }
            return { message: '사용 가능한 이메일입니다.' };
        }
        catch (error) {
            return { ErrorMessage: error.message };
        }
    }
    async checkPhone(phone) {
        try {
            const dupPhone = await this.user.findOne({ where: { phone: phone } });
            if (dupPhone) {
                throw new common_1.BadRequestException('이미 가입된 연락처입니다.');
            }
            return { message: '사용 가능한 연락처입니다.' };
        }
        catch (error) {
            return { ErrorMessage: error.message };
        }
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async signupUser(signupUserDto) {
        try {
            console.log(signupUserDto);
            const checkUser = await this.user.findOne({
                where: { email: signupUserDto.email, phone: signupUserDto.phone },
            });
            if (checkUser) {
                throw new common_1.BadRequestException('이미 가입된 유저입니다.');
            }
            const signup = this.user.create(signupUserDto);
            const saveSignup = await this.user.save(signup);
            if (!saveSignup) {
                throw new common_1.BadRequestException('회원가입에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.');
            }
            return { success: true, message: '회원가입에 성공하였습니다.', data: saveSignup };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(10);
const jwt_1 = __webpack_require__(49);
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(18);
const auth_service_1 = __webpack_require__(86);
const user_service_1 = __webpack_require__(87);
const jwt_service_strategy_1 = __webpack_require__(89);
const user_token_entity_1 = __webpack_require__(26);
const core_1 = __webpack_require__(4);
const jwt_service_guard_1 = __webpack_require__(48);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_token_entity_1.UserTokenEntity]),
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: '60s' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            jwt_service_strategy_1.JwtServiceStrategy,
            { provide: core_1.APP_GUARD, useClass: jwt_service_guard_1.JwtServiceAuthGuard },
        ],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtServiceStrategy = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(10);
const passport_1 = __webpack_require__(90);
const passport_jwt_1 = __webpack_require__(91);
let JwtServiceStrategy = class JwtServiceStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-service') {
    constructor(configService) {
        super({
            secretOrKey: configService.get('JWT_SECRET_KEY'),
            ignoreExpiration: false,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.shop_access_token;
                },
            ]),
        });
        this.configService = configService;
    }
    async validate(payload) {
        return {
            user_id: payload.user_id,
            email: payload.email,
            name: payload.name,
        };
    }
};
exports.JwtServiceStrategy = JwtServiceStrategy;
exports.JwtServiceStrategy = JwtServiceStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtServiceStrategy);


/***/ }),
/* 90 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 91 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),
/* 92 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("6c88967c8a786848bd0d")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;