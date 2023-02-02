![indiego 배너](https://user-images.githubusercontent.com/80394894/215343325-a5fb83b1-567a-42fc-9d40-2b28f3159df9.jpg)


## 👩🏻‍💻 개굴단 팀원 소개  

|김경배|김혜원|박연환|김정희|박성호|이재혁|
|:---:|:---:|:---:|:---:|:---:|:---:|
|<img alt="김경배" src="https://user-images.githubusercontent.com/80394894/215560921-14de944c-6e0a-48f8-816d-56533ca34ce1.png" height="100" width="100">|<img alt="김혜원" src="https://user-images.githubusercontent.com/80394894/215561031-b94434f6-1fd3-429a-b374-aa4897545d4b.png" height="100" width="100">|<img alt="박연환" src="https://user-images.githubusercontent.com/80394894/215561204-8e085531-f851-48d4-bb3e-e8aad142565a.png" height="100" width="100">|<img alt="김정희" src="https://user-images.githubusercontent.com/80394894/215561134-da53fca5-b85c-4d2f-b077-e83a707f3de0.png" height="100" width="100">|<img alt="이재혁" src="https://user-images.githubusercontent.com/80394894/215555107-23fa07fe-fe13-4fe2-8c2f-572ba9f3917c.png" height="100" width="100">|<img alt="이재혁" src="https://user-images.githubusercontent.com/95069395/215324198-c238be32-d721-4c18-8cea-e56f8ca35486.png" height="100" width="100">|
|**FE**|**FE**|**FE**|**BE**|**BE**|**BE**|
</br>

## 🎸 indiego 소개
- 홍대 버스킹, 혜화 연극 등 일부 지역에 국한되어 있는 문화 컨텐츠를 가까운 우리 동네에서 즐길 수는 없을까? 라는 질문에서 시작되었습니다.
- 가수 또는 배우를 꿈꾸는 사람들, 취미로 음악, 연극 등의 활동을 하는 사람들에게 자신들만의 무대를 구성하여 홍보하고, 활동할 수 있는 공간을 만들고 싶었습니다.
- 또한, 음악과 연극 등의 문화 생활을 즐기는 사람들에게 가까운 우리 동네에서도 즐길 수 있도록 편리함을 제공하고 싶었습니다.
- 이 모든 요구사항을 만족시키기 위해 개굴단 단원들이 함께 고민하고 다듬어낸 것이 바로 indiego 웹 서비스입니다.
</br>


## 🎤 indiego 목표
- 우리 주변에는 취미로 음악과 연극 등을 하거나 이를 꿈꾸는 사람들이 많으며, 이를 즐기는 사람들이 많습니다.
- 하지만, 문화 컨텐츠를 즐길 수 있는 곳은 일부 지역으로 국한되어 있어 다양한 곳에서 경험을 하기에는 한계가 있습니다.
- 공연을 꿈꾸는 사람들에게 자신의 인지도를 쌓을 수 있고, 공연 경험 및 수익창출의 기회를 제공하고자 합니다.
- 문화 컨텐츠를 즐기는 사람들에게 잊지 못할 추억과 경험을 제공하고자 합니다.
- indiego 서비스는 부족한 지역 문화 컨텐츠를 증진시키고, 남녀노소 누구나 퍼포머가 되어 공연하고 이를 즐길 수 있는 플랫폼이 되는 것을 목표로 합니다.
- 마이너에서 메이저로! 자신만의 퍼포먼스를 발휘할 수 있는 곳이 바로 indiego입니다.
</br>



## 🗓️ 프로젝트 기간
- 2023.01.03 ~ 2023.02.03
</br>

## 🔗 배포 링크
- http://indiego.site/
</br>

## 📌 기술 스택 및 아키텍처

![아키텍처](https://user-images.githubusercontent.com/80394894/215329355-ef124266-72e1-44b4-8af3-c90261fb987d.PNG)

</br>
</br>

## 📓 ERD

![인디고 erd 다이어그램](https://user-images.githubusercontent.com/80394894/215329542-fdfa3b2e-a627-4427-a68f-9cc50e2274dc.PNG)

</br>
</br>

## 📚 UserFlow
||||
|:---:|:---:|:---:|
|**비로그인 유저**|**일반회원(로그인 유저)**|**퍼포머(로그인 유저)**|
|<img width="1888" alt="userflow-User" src="https://user-images.githubusercontent.com/80394894/215343144-0cbd0ed3-e980-43b7-ad21-e0a4844a8794.png">|<img width="2224" alt="userflow-Member" src="https://user-images.githubusercontent.com/80394894/215343162-e947cca2-b63a-4fd4-987e-98976c6b2fb1.png">|<img width="2240" alt="userflow-Performer" src="https://user-images.githubusercontent.com/80394894/215343177-c9ce7969-88f3-47e1-b65f-f35cc09dedae.png">|
</br>

## ✨ 서비스 구현
### 회원(User, Performer)
- Create : 일반회원 또는 퍼포머회원으로 회원가입, 로그인 및 로그아웃 기능
- Read : 회원 마이페이지 조회(회원정보, 공연예약에 대한 정보), 다른 회원의 프로필 조회 기능
- Update : 회원 마이페이지 수정(닉네임,소개,우리동네 설정 등) 기능
- Delete : 회원 탈퇴 기능

### 게시글(Article)
- Create : 일반 회원/퍼포머 게시글 및 댓글 작성 기능
- Read : 비회원/일반 회원/퍼포머 게시글 조회 및 게시글 검색 기능
- Update : 일반 회원/퍼포머 게시글 및 댓글 수정 기능
- Delete : 일반 회원/퍼포머 게시글 및 댓글 삭제 가능

### 공연(Show)
- Create : 퍼포머 공연 작성 기능, 일반 회원은 리뷰 작성 기능, 퍼포머/일반 회원 공연 예약 생성 기능
- Read : 퍼포머/일반 회원/비회원 공연 조회 가능, 일반 회원/비회원 답변 조회 기능, 퍼포머 판매 공연 조회 기능, 일반 회원 공연 예약 조회 기능
- Update : 퍼포머 공연 수정 기능, 일반 회원 답변 수정 기능
- Delete : 퍼포머 공연 삭제 기능, 회원 답변 삭제 기능

</br>

## 🖥️ 서비스 화면


### 메인 화면

||||
|:---:|:---:|:---:|
|**비회원 메인 화면**|**지역별 날짜별 공연 조회**|**회원 지역별 현황 조회**|
|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215596135-f333470c-990c-4641-bfdf-7c32958874e4.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215596154-99f4d010-c452-4380-8dd5-c33b1e54fedb.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215596163-560a30d3-5aea-4ca6-a091-7480a2b10ed4.gif"/>|
|**메인 공연 검색**|**인기 게시글**|
|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215596163-560a30d3-5aea-4ca6-a091-7480a2b10ed4.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215596148-77b7c68d-35d5-4a1a-b93b-90697fb04c0a.gif"/>||

<br/>

### 회원

||||
|:---:|:---:|:---:|
|**회원가입,로그인**|**소셜 로그인**|**마이페이지**|
|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215601508-d20fd052-7c1a-479c-bf5c-399457785c9c.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215601501-c6726d15-931b-47db-981c-a6bf76704c1d.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215601490-146290d6-2e9d-403b-b44e-e594de485ac5.gif"/>|

<br/>

### 공연

||||
|:---:|:---:|:---:|
|**공연 작성**|**공연 댓글**|**공연 예약**|
|<img width="100%" src=""/>|<img width="100%" src=""/>|<img width="100%" src=""/>|
|**공연 검색**|**공연 지도조회**||
|<img width="100%" src=""/>|<img width="100%" src=""/>||

<br/>


### 커뮤니티(게시글)

||||
|:---:|:---:|:---:|
|**게시글 작성**|**게시글 수정**|**게시글 조회 및 검색**|
|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215602632-169dd28b-08b4-476d-b25e-9ee7ef2f70d3.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215602652-84c6e0ef-ac00-42e9-b992-b4b43cb7e28b.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215605338-53b03d4b-7298-43e9-bd0c-c8a37db8df50.gif"/>|
|**게시글 삭제**|**게시글,댓글 좋아요**||
|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215602688-cfd61585-d60b-4744-9a87-882e2e2fffe3.gif"/>|<img width="100%" src="https://user-images.githubusercontent.com/95069395/215602675-43008b57-fda5-4f53-aa6a-8f4829ffc575.gif"/>||

<br/>





