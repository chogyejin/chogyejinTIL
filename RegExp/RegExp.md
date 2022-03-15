# Regular Expression

- 정규표현식은 문자열에서 특정 패턴을 만족하는 부분을 찾아낼 때 사용
- `\d` : digit, 숫자를 대표하는 정규표현식
- `\w` : \_(언더스코어) 포함하여 문자와 숫자를 대표하는 정규표현식
- `+` : 하나 혹은 그 이상 연결된, `\d+`는 하나 혹은 그 이상 연결된 숫자
- `*` : 0개 이상이다.
  - 자연수 : 처음에 1~9 나오고 그 뒤는 숫자가 0개 이상, `[1-9]\d*`
- `?` : 있거나 없거나, `-?`는 -가 있거나 없거나
  - 전화번호는 숫자 사이에 -가 있을 수도 없을 수도 있음,
  - `\d+-?\d+-?\d+` : 하나 혹은 그 이상 연결된 숫자가 -로 연결됐을 수도 있고 아닐 수도 있다. 문자열에 -가 없다면 `\d+\d+\d`로 줄어드는데, `\d+\d`는 `\d+`와 같은 의미가 된다.
  - -과 함께 공백도 포함될 수 있기 때문에 `\d+[- ]?\d+[- ]?\d+` 필요
- `{숫자}` : 숫자 번 반복, `\d+[- ]?\d+[- ]?\d+`의 숫자들마다 반복횟수 지정 필요(+가 반복으로 대체됨)
  - `\d{2}[- ]?\d{3}[- ]?\d{4}`는 2자리, 3자리, 4자리까지 나오게 함
  - 첫 번째에서 3자리 못 나옴
- `{숫자1, 숫자2}` : 숫자1 ~ 숫자2 번 반복

  - `\w{2,3}`는 문자가 2~3번 반복
  - 전화번호는 처음 2~3, 가운데 3~4, 마지막 4번 반복, `\d{2,3}[- ]?\d{3,4}[- ]?\d{4}`

    ```
    # Python 전화번호 문자열 찾기
    regex = r'\d{2,3}[- ]?\d{3,4}[- ]?\d{4}'

    search_target = '''이상한 전화번호 0030589-5-95826
    Luke Skywarker 02-123-4567 luke@daum.net
    다스베이더 070-9999-9999 darth_vader@gmail.com
    princess leia 010 2454 3457 leia@gmail.com'''

    import re
    result=re.findall(regex,search_target)
    print(result)

    # 출력 : ['02-123-4567', '070-9999-9999', '010 2454 3457']
    ```

- 고르기 : 대괄호([]) 안에 글자를 넣음
  - `[aeiou]` : 알파벳 소문자 모음 하나 찾기
  - `[a-z]+` : 알파벳 소문자 하나 찾기 `[abcdefghijklmnopqrlstuvwxyz]`로 할 수 있지만 범위로도 표현 가능
  - `[가-힣]+` : 한글 단어 찾기(자음이나 모음 단독은 찾지 못함)
  - `\s` : 공백 문자(스페이스, 탭, 뉴라인)
  - `\S` : 공백 문자 제외 모든 문자
  - `\D` : 숫자 제외 모든 문자
  - `/W` : 글자 대표 문자 제외한 특수 글자(특수 문자, 공백 등)

# 프로그래밍 언어별 Regular Expression

1. JAVA

- escape 문자 때문에 역슬래시 두 개 이용
- Pattern 클래스와 Matcher 클래스 이용

```
import java.io.Console;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MyRegex{
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d");
        Matcher matcher = pattern.matcher(searchTarget);
        while(matcher.find()){
            System.out.println(matcher.group(0));
        }
    }
}

// 출력 : 모든 숫자 한 줄씩 출력
```

2. Javascript

- 문자열(searchTarget)의 내장 함수 match 이용
- g는 global로 정규표현식과 일치하는 모든 내용 찾아오라는 의미

```
var searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\
다스베이더 070-9999-9999 darth_vader@gmail.com\
princess leia 010 2454 3457 leia@gmail.com";

var regex = /\d/g;
console.log(searchTarget.match(regex));

// 출력 : ['0', '2', '1', '2', ... , '5', '7']
```
