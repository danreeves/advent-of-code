use std::collections::HashMap;
use std::env;
use std::fs;

fn main() {
    let mut args = env::args();
    if args.len() != 3 {
        println!("Usage: two [1|2] [filename]");
        return;
    }

    args.next();

    let task = args.next().unwrap();
    let filename = args.next().unwrap();
    let contents = fs::read_to_string(filename).unwrap();
    let input = contents
        .split('\n')
        .filter(|line| !line.is_empty())
        .collect::<Vec<&str>>();

    let output = match task.as_ref() {
        "1" => task_1(input),
        "2" => task_2(input),
        _ => String::from(""),
    };

    println!("Result: {}", output);
}

fn task_1(input: Vec<&str>) -> String {
    let counts = input
        .iter()
        .map(|string| count_letters(string))
        .fold((0, 0), move |acc, x| {
            let (mut twos, mut threes) = acc;
            if x.0 {
                twos = twos + 1;
            }
            if x.1 {
                threes = threes + 1
            }
            (twos, threes)
        });

    format!("{}", counts.0 * counts.1)
}

fn task_2(input: Vec<&str>) -> String {
    let mut matching: Option<(&str, &str)> = None;
    let mut last_diff_index = 0;

    for w1 in &input {
        for w2 in &input {
            if w1 == w2 {
                continue;
            }
            let mut diff_chars = 0;
            last_diff_index = 0;
            let chars1 = w1.chars();
            let chars2 = w2.chars();
            let chars = chars1.zip(chars2);
            for icc in chars.enumerate() {
                let (i, cc) = icc;
                let (c1, c2) = cc;
                if c1 != c2 {
                    diff_chars = diff_chars + 1;
                    last_diff_index = i;
                }
            }
            if diff_chars == 1 {
                matching = Some((*w1, *w2));
                break;
            }
        }
        if matching.is_some() {
            break;
        }
    }
    if matching.is_some() {
        let mut match1 = String::from(matching.unwrap().0);
        match1.remove(last_diff_index);
        return match1;
    }
    format!("")
}

//                                (has_two, has_three)
fn count_letters(string: &str) -> (bool, bool) {
    let mut counts = HashMap::new();
    let mut has_three = false;
    let mut has_two = false;

    for ch in string.chars() {
        let count = counts.get(&ch);
        if count.is_some() {
            counts.insert(ch, count.unwrap() + 1);
        } else {
            counts.insert(ch, 1);
        }
    }

    for count in counts.values() {
        if *count == 3 {
            has_three = true
        } else if *count == 2 {
            has_two = true
        }
        if has_three && has_two {
            break;
        }
    }

    (has_two, has_three)
}

#[cfg(test)]
mod test {
    use super::count_letters;

    #[test]
    fn counts_none() {
        assert_eq!(count_letters("abc"), (false, false));
    }

    #[test]
    fn counts_two() {
        assert_eq!(count_letters("aa"), (true, false));
    }

    #[test]
    fn counts_three() {
        assert_eq!(count_letters("aaa"), (false, true));
    }

    #[test]
    fn counts_two_and_three() {
        assert_eq!(count_letters("aaabb"), (true, true));
    }
}
