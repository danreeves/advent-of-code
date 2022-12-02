const textInput = Deno.readTextFileSync("./01-input");

function sumAndSort(data: string): number[] {
  return data.split("\n\n")
    .map((elf) =>
      elf
        .split("\n")
        .reduce((total, current) => total + parseInt(current, 10), 0)
    ).sort((a, b) => b - a);
}

function mostCaloriesCarried(data: string) {
  const highest = sumAndSort(data)[0];
  console.log("Highest calories carried: ", highest);
}

mostCaloriesCarried(textInput);

function totalTopThreeCaloriesCarried(data: string) {
  const highest = sumAndSort(data).slice(0, 3);

  console.log(
    `Highest calories carried by 3: `,
    highest.reduce((t, v) => t + v, 0),
  );
}

totalTopThreeCaloriesCarried(textInput);
