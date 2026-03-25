# Todo List App

## 시연 영상



https://github.com/user-attachments/assets/c85a1e75-79b8-47cf-89c5-b0964cb54a60



---

React + Vite로 만든 간단한 Todo List 프로젝트입니다.  
로컬 API(`json-server`)를 사용해 할 일을 저장하고, 스톱워치와 랜덤 명언 컴포넌트를 함께 제공합니다.

---

## Preview

- Todo 추가 / 목록 조회 / 삭제
- 스톱워치 시작, 정지, 초기화
- 랜덤 명언 표시

---

## 구현 항목 및 적용 설명

아래는 프로젝트 요구사항과 실제 적용 내용을 정리한 항목입니다.

1. Todo 생성 / 조회 / 수정 / 삭제 (**CRUD**) 기능 구현  
   - 생성(`POST /todo`), 조회(`GET /todo`), 삭제(`DELETE /todo/:id`)를 구현했습니다.  
   - 수정(`PATCH /todo/:id`)은 구조를 잡아두었고, UI 수정 기능은 다음 단계로 확장 가능합니다.

2. **현재 시간 표시, 타이머, 스톱워치** 중 하나 이상 구현  
   - `StopWatch` 컴포넌트로 시작/정지/초기화 기능을 구현했습니다.

3. **랜덤 명언** 컴포넌트 구현  
   - `Advice` 컴포넌트에서 외부 명언 API를 호출해 랜덤 명언을 표시합니다.

4. **useState**, **useEffect**, **useRef** 각각 1회 이상 사용  
   - `useState`: Todo 목록, 스톱워치 상태 등 관리  
   - `useEffect`: 데이터 fetch, 타이머 interval 처리  
   - `useRef`: 입력창 참조, 타이머 ID 관리

5. 자유 CSS 적용  
   - `App.css`를 통해 레이아웃/스타일을 자유롭게 구성했습니다.

6. **json-server**로 Todo 파일 저장  
   - `db.json`을 데이터 저장소로 사용하며 `npm run server`로 API 서버를 실행합니다.

7. **Custom Hook** 작성 및 사용  
   - `useFetch` 커스텀 훅을 만들어 Todo 데이터/명언 데이터를 재사용 가능한 형태로 조회합니다.

---

## Tech Stack

- **Frontend:** React 19, Vite
- **State & Hooks:** `useState`, `useEffect`, `useRef`, Custom Hook(`useFetch`)
- **Mock Backend:** `json-server`
- **Lint:** ESLint

---

## Project Structure

```bash
Todo-List-App
├── src
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
└── README.md
```

---

## Getting Started

### 1) 설치

```bash
npm install
```

### 2) 백엔드 서버 실행 (json-server)

```bash
npm run server
```

- 기본 주소: `http://localhost:3001`
- Todo API: `http://localhost:3001/todo`

### 3) 프론트엔드 실행

```bash
npm run dev
```

- 기본 주소: `http://localhost:5173`

> 프론트와 백엔드는 **각각 별도 터미널**에서 동시에 실행해야 합니다.

---

## Available Scripts

- `npm run dev` : Vite 개발 서버 실행
- `npm run server` : `db.json` 기반 `json-server` 실행
- `npm run build` : 프로덕션 빌드
- `npm run preview` : 빌드 결과 미리보기
- `npm run lint` : ESLint 검사

---

## API Example

`json-server` 기준으로 아래 요청을 사용할 수 있습니다.

- `GET /todo` : 전체 Todo 조회
- `POST /todo` : Todo 추가
- `DELETE /todo/:id` : Todo 삭제

요청 본문 예시:

```json
{
  "content": "React 공부하기",
  "time": 0
}
```

---

## Troubleshooting

### Todo 추가가 안 될 때

대부분 `json-server`가 실행되지 않은 경우입니다.

1. 새 터미널에서 `npm run server` 실행
2. `http://localhost:3001/todo` 접속 확인
3. 프론트(`npm run dev`) 새로고침

---

## License

개인 학습용 프로젝트입니다.
