import { Title } from "solid-start";
import SVGexample from "~/svg/solidsvgs";
import Counter from "~/components/Counter";

// style={{
//       width: '100%',
//       height: '100%'
//     }}
// export default function Home() {
//   return (
//       <SVGexample />
//   );
// }
export default function Home() {
  return (
    <main>
      <Title>ScalVGo</Title>
      <h1>Canvas</h1>
      <SVGexample />
    </main >
  );
}
    //     <style>
    //       div {
    // }
    //     </style>

// export default function Home() {
//   return (
//     <main>
//       <Title>Hello World</Title>
//       <h1>Hello world!</h1>
//       <Counter />
//       <p>
//         Visit{" "}
//         <a href="https://start.solidjs.com" target="_blank">
//           start.solidjs.com
//         </a>{" "}
//         to learn how to build SolidStart apps.
//       </p>
//     </main>
//   );
// }
