export default function ClubContent() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl prose prose-lg 
        !prose-headings:text-gray-900
        !prose-p:text-gray-900
        !prose-strong:text-gray-900
        !prose-ul:text-gray-900
        !prose-li:text-gray-900
        [&_h2]:!text-3xl
        [&_h2]:!font-bold
        [&_h3]:!text-2xl
        [&_h3]:!font-semibold
        [&_h3]:!mt-8
        [&_p]:!leading-relaxed
        [&_ul]:!mt-4
        [&_li]:!mt-2
        prose-a:!text-blue-600
        hover:prose-a:!text-blue-500
      ">
        <h2>What is the Applied AI Club?</h2>
        <p>
          We (Praveen and Bala) started building agents with no coding experience. We went through our months of learning and building. Our years of work in building products at several large scale companies helped. The Club is our way of helping and nurturing the people like us who are passionate about building agents.
        </p>

        <h3>What You&apos;ll Get</h3>
        <ul>
          <li>
            <strong>Basic training to code:</strong> We&apos;ll teach you how to use the new age tools to start building.
          </li>
          <li>
            <strong>Problem Statement Research:</strong> How to identify problem statements and how to conduct research to validate them.
          </li>
          <li>
            <strong>Community Help:</strong> Use the community to get help when you&apos;re stuck.
          </li>
          <li>
            <strong>Find a co-builder:</strong> Connect with other builders who share the same passion.
          </li>
          <li>
            <strong>Help with distribution:</strong> For select projects, we&apos;ll help you with distribution.
          </li>
        </ul>

        <h3>Club Guidelines</h3>
        <p>
          This is a moderated club. We are opinionated about how this club should be used. Pls read the following guidelines carefully.
        </p>
        <ul>
          <li>This is not a place to market your product. We are not a sales channel.</li>
          <li>Don&apos;t give gyan. Provide direct actionable advice that can be directly used.</li>
          <li>Be respectful and supportive of fellow members</li>
          <li>Focus on practical, real-world applications</li>
          <li>Provide constructive feedback</li>
          <li>No politics. No religion. No drama.</li>
          <li>We reserve the right to remove anyone who we feel does not fit the club culture.</li>
        </ul>

        <h3>What&apos;s Happening in the Club</h3>
        <p>
          Apart from open ended conversations and help, we&apos;ll also have structured sessions on different topics.
        </p>
        <ul>
          <li>Weekly office hours for select members with the Applied AI team</li>
          <li>Monthly showcases of member projects</li>
          <li>Technical discussions and problem-solving sessions</li>
          <li>Regular workshops and learning sessions</li>
        </ul>
      </div>
    </div>
  );
} 