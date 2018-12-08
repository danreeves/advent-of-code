use std::env;
use std::fs;

fn main() {
    let args = env::args();
    if args.len() != 2 {
        println!("Usage: one filename.txt");
        return;
    }
    let filename = args.last().unwrap();
    let contents = fs::read_to_string(filename).unwrap();
    let input = contents.split('\n').map(|line| line.parse::<i64>().unwrap_or(0)).collect::<Vec<i64>>();

    let output = input.iter().fold(0, |acc, x| acc + x);
    println!("{}", output);
}
