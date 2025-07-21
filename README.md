# 네이버 블로그 프로젝트 (DevOps)

## [프로젝트 기획서]

### 🍀 개요
- **_프로젝트명_**: 네이버 블로그 게시판 프로젝트
- **_프로젝트 기간_**: 2025-06-19 ~ 2025-07-14
- **_팀원:_** 이혜빈, 이채희, 이주희, 임현우, 김지환
- **_참고 사이트_** : 네이버 블로그(https://section.blog.naver.com/OfficialBlog.naver?currentPage=1)

### 🍀 **프로젝트 설명 / **목표 및 범위**
지금까지 배운 내용을 토대로 구현할 수 있는 최대한의 프로젝트를 찾다 네이버 블로그 클론코딩으로 로그인 인증, 서로 이웃 인가, 썸네일 이미지, 카테고리별 게시글 등 주요 기능을 활용할 수 있다는 장점에 선정하게 되었습니다.

이 프로젝트의 목표는 스프링 부트 구조를 이해하고, MSA를 통해 확장성과 유지보수성이 뛰어난 서비스를 구현하는 것이 목표입니다.
또한, RESTful API를 통해 일관된 HTTP 기반 인터페이스 사용 방식을 익히고, Swagger와 Postman을 활용한 API 명세 자동화를 통해 개발자 간 협업과 테스트의 용이성을 확보하는 것을 목표로 합니다.

### 🍀 **타겟 사용자**
**🧑‍💼사용자 🧑‍🏫블로거 👤관리자**

### 🍀 **기술 스택**
| 서버 구성       | Spring Boot, Spring Security, JPA, Eureka, Gateway |
| --------------- | -------------------------------------------------- |
| 데이터베이스    | MySQL                                              |
| 개발 도구       | IntelliJ IDEA, Postman, DevOps                     |
| API 문서화 도구 | springdoc-openapi 2.8.9(Swagger)                   |

---

## **[요구사항 정의서]**

### 🍀주요 기능

**상세 요구사항 명세서:** https://www.notion.so/coffit23/216a02b1ffb1817db3a1d589cb569482

| 기능 구분     | 주요 기능 설명                                        |
| ------------- | ----------------------------------------------------- |
| 회원 기능     | 회원가입, 로그인/로그아웃, 비밀번호 찾기, 프로필 설정 |
| 블로그 홈     | 최신 글 목록, 인기 글, 카테고리별 글 보기, 검색 기능  |
| 글 작성/관리  | 글 작성, 수정, 삭제, 임시 저장, 발행 예약, 태그 설정  |
| 미디어 첨부   | 이미지, 동영상, 지도, 링크 첨부 기능                  |
| 댓글 기능     | 댓글 작성, 수정, 삭제, 대댓글, 댓글 알림              |
| 이웃 기능     | 이웃 추가/삭제, 서로이웃 설정, 이웃 새 글 알림        |
| 블로그 디자인 | 스킨 선택, 위젯 설정, 프로필 영역 커스터마이징        |
| 통계 기능     | 방문자 수, 글 조회수, 유입 경로 분석                  |
| 모바일 대응   | 반응형 UI, 모바일 전용 메뉴 및 글쓰기 지원            |
| 기타 기능     | 공감, 공유, 스크랩, 글 신고, 비공개 설정 등           |

### 🍀담당 기능
| **담당자** | **주요 기능**                                | **세부 구현 업무**                                    |
| -------- | ---------------------------------------------- | ----------------------------------------------------- |
| 이혜빈   | 회원 가입, 로그인, 로그아웃, 보안 인증 및 인가 | 회원가입 및 로그인 UI, 폼, 유효성 검사 / 서버 API, 인증, JWT, DB 연동    |
| 김지환   | 에디터, 이미지 삽입 / 게시글 발행, 수정, 삭제   | FTP파일 업로드 포함 게시글 폼 데이터 입력 / 게시글 CRUD, API, DB 연동 |
| 이주희   | 댓글 작성, 수정, 삭제 / 공감 기능              | 댓글 UI, 댓글 목록 입력, 공감 카운트(+-) / 댓글 CRUD, API, DB 연동         |
| 임현우   | 프로필, 마이페이지 수정, 이웃 기능             | 프로필 UI, 정보 수정, 이웃 설정 / 프로필 API, DB 연동            |
| 이채희   | 메인 페이지, 게시글 검색, 주제 필터 기능        | 검색 UI, 필터링 / 검색 API, DB 연동, 기타 부가 기능   |

### 🍀API 명세서
**상세 API 명세서** : https://www.notion.so/coffit23/API-224a02b1ffb180fb9ab7ec7a86e104ea

**주요 API 표 :**
| 기능 | 메서드 | URL | 요청 바디 | 응답 바디 | 비고 |
|-------------|-----------|--------|--------------|--------------|---------|
| 게시글 생성 | POST | /api/posts | form-data <br> • requestDto: JSON <br> • thumbnailFile: 파일 | 없음 (201 Created 응답) | 제목, 본문, 이미지, 주제, 공개범위, 예약발행 등 포함 |
| 댓글 목록 조회 | GET | /api/posts/{postId}/comments | 없음 | { "comments": [{ commentId, author, content, isSecret, likeCount... }], totalCount } | 비밀댓글 및 공감 정보 포함 |
| 내가 추가한 이웃 목록 조회 | GET | /api/neighbors/my-followings/added | 없음 | { isMutual, createdAt, followedAt }, { blogTitle, introduceText } | JWT 인증 필요 |
| 로그인 | POST | /api/auth/login | { id, password, deviceId } | { accessToken, refreshToken, user: { id, blogTitle, nickname, ... } } | JWT 토큰 발급 및 유저 정보 포함 |
| 내 블로그 정보 조회 | GET | /api/blog/{id} | 없음 | { id, blogTitle, nickname, blogId, introduceText, profileImageUrl, following, follower } | 유저 식별용 ID로 블로그 정보 반환 |

--- 

## [화면 설계서]

### 🍀Figma
**피그마 사이트**: https://www.figma.com/design/8Nt7QRATRXUoyEid9wAEkL/BE09_4th_2team?node-id=0-1&t=RdBYcVvlFhlY9w50-1

### 🍀DDD
**DDD 사이트**: https://miro.com/app/board/uXjVImFpKUE=/

<img width="700" height="600" alt="{B2DE9B49-0414-4911-BC2B-2CB75B715368}" src="https://github.com/user-attachments/assets/a2d51efb-43f8-46d0-8c1c-c88a4b8a3065" />

### 🍀MSA 아키텍처 설계서

<img width="700" height="600" alt="Image" src="https://github.com/user-attachments/assets/ca2b00c3-e9f5-45e8-9368-d6a41e6d1f02" />


### 🍀테스트 케이스 + 테스트 결과서

**테스트 케이스+ 테스트 결과서 :** https://docs.google.com/spreadsheets/d/1u56oi2BC_daUCej5LbtwuU7EEhu17qTYs92x-xUFBUg/edit?usp=sharing

---
## [회고]
