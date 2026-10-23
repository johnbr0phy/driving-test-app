import Link from "next/link";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Creation uses the person's connected assistant; the web editor remains for existing quizzes. */
export function CreateSources() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Choose your assistant</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Connect TigerTest to your own ChatGPT or Claude account. Your assistant writes the questions and saves the quiz to TigerTest through the connector.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button asChild className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
          <Link href="/connect#add-to-chatgpt"><Link2 className="w-4 h-4" aria-hidden="true" /> Use ChatGPT</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/connect#add-to-claude"><Link2 className="w-4 h-4" aria-hidden="true" /> Use Claude</Link>
        </Button>
      </div>
      <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <li>Follow your assistant's setup guide. Sign in to TigerTest and approve the connection.</li>
        <li>In a chat with TigerTest enabled, share your material, who the quiz is for and what they should learn. Ask your assistant to make a TigerTest quiz.</li>
        <li>Answer any questions about missing context. Review and approve the save when your assistant asks, then open your quiz link to practice, edit or share.</li>
      </ol>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        These links open setup instructions, not an automatic connection. Availability depends on your chat app and workspace permissions.
        Your chat account handles question generation; TigerTest does not use its own AI key to write your quiz.
      </p>
    </div>
  );
}
