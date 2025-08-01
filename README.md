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

## [MSA 아키텍처 설계서]

<img width="961" height="721" alt="기획_1팀_시스템 아키텍처 drawio" src="https://github.com/user-attachments/assets/2b614e2e-5df1-4733-b4d5-d826de2fb70c" />

## [테스트 케이스 + 테스트 결과서]

**테스트 케이스+ 테스트 결과서 :** https://docs.google.com/spreadsheets/d/1u56oi2BC_daUCej5LbtwuU7EEhu17qTYs92x-xUFBUg/edit?usp=sharing

---
## 회고 (개발 후)

- 이채희 : 이번 프로젝트는 처음으로 백엔드와 프론트엔드를 결합하는 과정을 하다 보니 어려움이 많은 프로젝트였던 것 같다. 그리고 블로그 서비스 특성상 여러가지 기능이 결합되어 있다 보니, 각자가 맡은 엔티티를 연동하고, 또 API를 호출하고 연결하는 과정에 많은 어려움이 있었다. 또 하나의 테이블에 담긴 데이터를 여러 기능에서 같이 사용해야 하는 상황이 많았다 보니, 데이터에 변동이 있으면 잘 작동하던 기능도 갑자기 작동하지 않는 등, 수많은 트러블들과 싸웠던 프로젝트였던 것 같다. 무엇보다 예비군 훈련으로 인해 배포 과정을 함께 하지 못했던 것도 정말 아쉬움으로 남는다.  파이프라인 구축, 테스트, 배포 과정도 여러 트러블이 있었다고 들었는데, 그 과정 가운데 같이 문제를 해결하지 못한 것이 아쉬움으로 남았다.

- 이주희: 프론트엔드, 백엔드, 데브옵스까지 전체 개발 프로세스를 처음 경험한 프로젝트였습니다. Axios(프론트엔드)와 Spring Boot의 @RestController(백엔드)를 활용해 첫 API 연동을 구현했고, Post-Comment, Comment-User 관계에서 @ManyToOne 단방향 매핑을 사용하며 JPA 연관관계 개념을 더 깊이 이해할 수 있었습니다. 배포 측면에서는 Jenkins 기본 배포부터 Jenkins+Webhook, 최종적으로 Jenkins+ArgoCD+Kubernetes+EKS까지 단계적으로 배포 자동화를 경험했습니다. Next.js의 SSR/SSG 특성을 고려한 컨테이너 배포를 통해 CI/CD 파이프라인의 전체 흐름을 이해할 수 있었습니다. 비록 완전한 프론트-백 통합은 시간 제약으로 마무리하지 못했지만, 개발부터 배포까지의 실무와 유사한 개발 환경을 체험할 수 있었던 값진 경험이었습니다. 특히 처음 다뤄본 DevOps 도구들을 통해 실제 개발 생명주기 전반에 대한 이해도가 크게 향상되었습니다

- 이혜빈 : ERD 설계를 주도하며, 개발 효율성과 확장성을 고려한 구조를 고민했습니다.
본격적인 개발에 앞서 ERD 설계에 많은 시간을 투자했습니다. 단순히 데이터를 담는 구조가 아닌, 실제 개발 과정에서 불필요한 복잡도를 줄이고 유연하게 기능을 확장할 수 있도록 고민했습니다. 이를 위해 엔터티를 작고 명확하게 나누고, 테이블 간의 의존성을 최소화하는 방향으로 설계했습니다. 이 과정은 이후 개발 속도를 높이고, 팀원 간 협업에도 큰 도움이 되었습니다.
 멀티 디바이스 로그인을 직접 설계하며 인증 시스템의 깊이를 체감했습니다.
로그인 기능을 개발하면서 “같은 사용자가 다른 디바이스에서 로그인한다면, 각각의 access token 만료 시간은 달라야 하지 않을까?” 라는 의문이 들었고, 이를 해결하기 위해 디바이스별로 토큰을 분리 발급하고 관리하는 구조를 직접 설계해 구현했습니다. 인증은 서비스 보안과 직결되는 만큼, 테스트 코드를 작성하여 오류를 검증한 뒤에 커밋했습니다. 이 경험을 통해 테스트 코드의 중요성과 신뢰할 수 있는 인증 로직 구성 방법을 배울 수 있었습니다.
AWS 기반 MSA 배포 경험을 통해 클라우드 인프라 운영 능력을 키웠습니다.
 이번 프로젝트에서는 AWS 환경에서의 배포도 직접 경험했습니다. EC2에 클러스터를 구성하고, 노드 단위로 서비스를 나누어 MSA(Microservice Architecture) 방식으로 배포하는 전 과정을 직접 수행하며 클라우드 인프라에 대한 실질적인 이해도를 키울 수 있었습니다.
협업 스킬과 일정 관리의 중요성을 실감하며 개발자로서 성장했습니다.
프로젝트가 커지고 기능이 복잡해질수록, 단순한 코드 구현을 넘어 팀원 간의 사전 협의와 원활한 커뮤니케이션이 프로젝트의 완성도를 좌우한다는 사실을 깨달았습니다. 또한, 기능을 잘 만드는 것만큼이나 마감 기한을 지키는 책임감 또한 개발자에게 중요한 덕목임을 배울 수 있었습니다.

- 임현우 : 처음 백엔드와 프론트엔드를 결합하다 보니 사전에 API를 작성할때 더 자세하게 고려하지 못해서 그런가, 병합과정에서 코드 수정이 많아 지면서 늦어진것 같다. 또한 각자 맡은 부분을 연동하는 과정에서도 생각치 못한 기능들이 있었고, 추가 코드 수정이 늦어지면서 우리가 예상한 기간보다 더 늦어지는 상황이 발생했다. 또한 AWS를 처음 써보면서 생각보다 생소한 부분이 많았고, 개인적으로는 CI와 CD를 연결하는 부분이 가장 이해 안가고 어려웠던것 같다. 다음에 하면 더 잘할수 있지 않을까? 하는 아쉬움이 많이 남는 프로젝트였다.

- 김지환 : 프런트 부분에서 ToastUI와 같은 에디터를 가져오지 않고,  네이버와 최대한 비슷한 UI를 만들고 원하는 기능을 넣기위해 커스텀 에디터를 만들었습니다.
특히 스프라이트CSS로 좌표식 이미지 삽입과 모달 기능 등을 구현 해봤습니다.
백엔드 부분에서 FTP 파일 전송 시스템과 (프런트)로컬에서 업로드해 온 파일(이미지 파일)을 폼데이터로 만들어 전송하고 썸네일 이미지까지 저장하며 발행 요청하는 부분까지의 과정에서 많은 어려움을 겪었습니다.
이번 프로젝트는 3주 일정으로 앞서 있었던 단위 프로젝트에 비해 매우 긴 시간을 팀원과 함께했습니다. 서로 소통하고 이슈를 해결하며 나가는 과정을 여러 번 겪었습니다. 특히 코드상 스타일이 다르다보니 여러 정책들을 설정하고 시작했지만 병합 과정에서 어려움이 컸습니다. 기획 과정에서 좀 더 세부하게 정책들을 정하고 맞춰나가는 것이 중요하다는 것을 알게 되었습니다.
개인적으로는 부족한 백, 프런트 코딩 능력에 많은 기능을 구현하지 못한 점이 아쉽습니다. 다만 네이버 블로그 클론 코딩 하며 잘 짜여진 프로젝트의 기능 구조를 배웠습니다.
