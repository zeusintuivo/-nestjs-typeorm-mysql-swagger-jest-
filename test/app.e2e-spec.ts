import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PostModule } from './../src/post/post.module';
import { CreatePostDto } from './../src/post/dtos';
import { PostCategory } from './../src/post/enums';

// - start Validation block linked to TypeStack using  npm i --save class-validator class-transformer
import { Logger, ValidationPipe } from '@nestjs/common';
// - end Validation block linked to TypeStack using  npm i --save class-validator class-transformer

let postId: string;

const post: CreatePostDto = {
  title: 'Happy Reading',
  slug: 'happy-reading',
  excerpt: 'Story about a happy life with good sex, food and health',
  content: 'There once was a little boy, that grew sad. He sat down and got happy procastinating. He later filmed The Office',
  category:  'TECHNOLOGY',
  tags: ['happy', 'reading', 'office'],
  status: true,
  more: 'should not pass this'
};
const postFaulty = {
  title: 1010,
  slug: true,
  excerpt: '',
  content: {},
  category:  'TECHNOLOGY',
  tags: ['happy', 'reading', 'office'],
  status: true,
  more: 'should not pass this'
};

describe('(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const logger = new Logger();

    // - start Validation block linked to TypeStack using  npm i --save class-validator class-transformer
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    );
    // - end Validation block linked to TypeStack using  npm i --save class-validator class-transformer
    await app.init();
  });
  describe('AppController', () => {
    it('/notfound (GET)', () => request(app.getHttpServer()).get('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (POST)', () => request(app.getHttpServer()).post('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (PUT)', () => request(app.getHttpServer()).put('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (PATCH)', () => request(app.getHttpServer()).patch('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (DELETE)', () => request(app.getHttpServer()).delete('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(HttpStatus.OK)
        .expect('Hello World!');
    }); // it
  }); // describe
  describe('Postontroller', () => {
    let controller='post'
    it(controller + '/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/' + controller + '/ping').expect(HttpStatus.OK)
        .expect('{"message":"received"}');
    });
    it('/ping (GET)', () => {
      return request(app.getHttpServer())
        .get('/' + controller + '/ping').expect(HttpStatus.OK)
        .expect('{"message":"received"}');
    }); // it
    it('/all (GET)', () => { 
      return request(app.getHttpServer())
      .get('/' + controller + '/').expect(HttpStatus.FOUND)
      .expect('{"posts":{"service":"TODO"}}');
    }); // it
    it('/.../create (POST)', () => {
      return request(app.getHttpServer())
        .post('/' + controller + '/create')
        .send(post).expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.error);
          expect(res.error).toBeDefined();
          expect(res.error).toEqual(false);
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.post).toBeDefined();
          // expect(body.post._id).toBeDefined();
          // postId = body.post._id;
          expect(body.post.title).toEqual(post.title);
          expect(body.post.slug).toEqual(post.slug);
          expect(body.post.excerpt).toEqual(post.excerpt);
          expect(body.post.content).toEqual(post.content);
          expect(body.post.category).toEqual(post.category);
          expect(body.post.tags).toEqual(post.tags);
          expect(body.post.status).toEqual(post.status);
          expect(body.post.more).toBeUndefined();
        })
    });
    it('/.../create validate postFaulty (POST)', () => {
      return request(app.getHttpServer())
        .post('/' + controller + '/create')
        .send(postFaulty).expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.error);
          expect(res.error).toBeDefined();
          expect(res.error.text).toEqual(res.text);
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          // console.log(body.message);
          expect(body).toBeDefined();
          expect(body.post).toBeUndefined();
          expect(body.message).toEqual([
            'title must be a string',
            'slug must be a string',
            'content must be a string'
          ]);
        })
    });
    // it('/ (POST)', () => { return request(app.getHttpServer()).post('/post').expect(HttpStatus.OK)}); // it
    // it('/ (PUT)', () => { return request(app.getHttpServer()).put('/post').expect(HttpStatus.OK)}); // it
    // it('/ (DELETE)', () => { return request(app.getHttpServer()).delete('/post').expect(HttpStatus.OK)}); // it
  }); // describe 

});
