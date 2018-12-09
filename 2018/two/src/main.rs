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
