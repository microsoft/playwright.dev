import React, {type ReactNode} from 'react';
 import Translate from '@docusaurus/Translate';
 import Link from '@docusaurus/Link';
 
 function WebsiteLink({to, children}: {to: string; children?: ReactNode}) {
   return (
     <Link to={to}>
       {children ?? (
         <Translate id="team.profile.websiteLinkLabel">website</Translate>
       )}
     </Link>
   );
 }
 
 type ProfileProps = {
   className?: string;
   name: string;
   location: string;
   children: ReactNode;
   githubUrl: string;
   twitterUrl?: string;
 };
 
 function AmbassadorProfileCard({
   className,
   name,
   location,
   children,
   githubUrl,
   twitterUrl,
 }: ProfileProps) {
   return (
     <div className={className}>
       <div className="card card--full-height">
         <div className="card__header">
           <div className="avatar avatar--vertical">
             <img
               className="avatar__photo avatar__photo--xl"
               src={`${githubUrl}.png`}
               alt={`${name}'s avatar`}
             />
             <div className="avatar__intro">
               <h3 className="avatar__name">{name}</h3>
               <h3 className="place">{location}</h3>
             </div>
           </div>
         </div>
         <div className="card__body">{children}</div>
         <div className="card__footer">
           <div className="button-group button-group--block">
             {githubUrl && (
               <a className="button button--secondary" href={githubUrl}>
                 GitHub
               </a>
             )}
             {twitterUrl && (
               <a className="button button--secondary" href={twitterUrl}>
                 Twitter
               </a>
             )}
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 function AmbassadorProfileCardCol(props: ProfileProps) {
   return (
     <AmbassadorProfileCard {...props} className="col col--6 margin-bottom--lg" />
   );
 }
 
 export function ActiveTeamRow(): JSX.Element {
   return (
     <div className="row">
       <AmbassadorProfileCardCol
         name="Pandy Knight"
         location="North Carolina, USA"
         githubUrl="https://github.com/AutomationPanda"
         twitterUrl="https://twitter.com/AutomationPanda"
        >
       </AmbassadorProfileCardCol>
       <AmbassadorProfileCardCol
         name="John Hill"
         location="California USA"
         githubUrl="https://github.com/unlikelyzero"
         >
       </AmbassadorProfileCardCol>
       <AmbassadorProfileCardCol
         name="Stefan Judis"
         location="Berlin, Germany"
         githubUrl="https://github.com/stefanjudis"
         twitterUrl="https://twitter.com/stefanjudis">
       </AmbassadorProfileCardCol>
       
     </div>
   );
 }
